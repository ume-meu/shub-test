package main

import (
	"encoding/csv"
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
)

// API to upload file
func uploadXlsx(c *fiber.Ctx) error {
	// Parse file
	file, err := c.FormFile("file")
	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error": true,
			"msg":   "File Not Found",
		})
	}

	// Upload Path
	uploadPath := fmt.Sprintf("./uploads/%s", file.Filename)

	// Save xlsx file
	if err := c.SaveFile(file, uploadPath); err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": true,
			"msg":   "Unable to save file",
		})
	}

	outputCSVPath := fmt.Sprintf("./uploads/%s.csv", "csvFile")

	// Convert XLSX file to CSV file
	if err := convertXlsx(uploadPath, outputCSVPath); err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": true,
			"msg":   err.Error(),
		})
	}

	os.Remove(uploadPath)

	return c.Status(200).JSON(fiber.Map{
		"error": false,
		"msg":   "File uploaded and processed successfully",
		// "path":  outputCSVPath,
	})
}

// API to query data
func queryData(c *fiber.Ctx) error {
	startTime := c.Query("start")
	endTime := c.Query("end")

	// Validate the query params
	if startTime == "" {
		return c.Status(400).JSON(fiber.Map{
			"error": false,
			"msg":   "Start Time Not Provided",
		})
	}
	if endTime == "" {
		return c.Status(400).JSON(fiber.Map{
			"error": false,
			"msg":   "End Time Not Provided",
		})
	}

	timeFormat := "15:04:05"
	start, err := time.Parse(timeFormat, startTime)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error": true,
			"msg":   "Invalid Start Time Format",
		})
	}
	end, err := time.Parse(timeFormat, endTime)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error": true,
			"msg":   "Invalid End Time Format",
		})
	}

	// Open csv file
	file, err := os.Open("./uploads/csvFile.csv")
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": true,
			"msg":   "Failed To Open CSV File",
		})
	}
	defer file.Close()

	// CSV Reader
	reader := csv.NewReader(file)

	// Read the first row from the CSV (header row)
	headers, err := reader.Read()
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": true,
			"msg":   "Failed To Read Header",
		})
	}

	var timeIdx, amountIdx int
	for index, header := range headers {
		lowerHeader := strings.ToLower(header)
		if strings.Contains(lowerHeader, "giờ") {
			timeIdx = index
		}
		if strings.Contains(lowerHeader, "tiền") {
			amountIdx = index
		}
	}

	// Read rows
	rows, err := reader.ReadAll()
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": true,
			"msg":   "Failed To Read CSV File",
		})
	}

	totalAmount := 0.0

	for _, row := range rows {

		// Get time from "giờ" column
		timeCol, err := time.Parse(timeFormat, row[timeIdx])
		if err != nil {
			continue // Skip invalid time
		}

		// Check time
		if !timeCol.After(start) && !timeCol.Before(end) {
			amount, err := strconv.ParseFloat(strings.ReplaceAll(row[amountIdx], ",", ","), 64)
			if err != nil {
				continue // skip rows with invalid amount format
			}
			totalAmount += amount
		}
	}

	// Return the total amount
	return c.Status(200).JSON(fiber.Map{
		"error":        false,
		"total_amount": totalAmount,
	})
}

func main() {
	app := fiber.New()

	app.Post("/upload", uploadXlsx)
	app.Get("/query", queryData)

	app.Listen(":8080")
}
