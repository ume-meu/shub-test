package main

import (
	"encoding/csv"
	"fmt"
	"os"
	"os/signal"
	"reflect"
	"strconv"
	"strings"
	"syscall"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

// API to upload file
func uploadXlsx(c *fiber.Ctx) error {
	// Parse file
	file, err := c.FormFile("file")
	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error":   true,
			"message": "File Not Found",
		})
	}

	// Upload Path
	uploadPath := fmt.Sprintf("./uploads/%s", file.Filename)

	// Save xlsx file
	if err := c.SaveFile(file, uploadPath); err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error":   true,
			"message": "Unable to save file",
		})
	}

	outputCSVPath := fmt.Sprintf("./uploads/%s.csv", "csvFile")

	// Convert XLSX file to CSV file
	if err := convertXlsx(uploadPath, outputCSVPath); err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error":   true,
			"message": err.Error(),
		})
	}

	os.Remove(uploadPath)

	return c.Status(200).JSON(fiber.Map{
		"error":   false,
		"message": "File Uploaded And Processed Successfully",
		// "path":  outputCSVPath,
	})
}

// API to get data
func getAllData(c *fiber.Ctx) error {

	// Open csv file
	file, err := os.Open("./uploads/csvFile.csv")
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error":   true,
			"message": "Failed To Open CSV File",
		})
	}
	defer file.Close()

	// CSV Reader
	reader := csv.NewReader(file)

	// Read the first row from the CSV (header row)
	header, err := reader.Read()
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error":   true,
			"message": "Failed To Read Header",
		})
	}

	// Read rows
	rows, err := reader.ReadAll()
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error":   true,
			"message": "Failed To Read CSV File",
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"error":   false,
		"message": "Get Data successfully",
		"header":  header,
		"rows":    rows,
		// "path":  outputCSVPath,
	})
}

// API to query data
func queryData(c *fiber.Ctx) error {
	startTime := c.Query("start")
	startTime = strings.TrimSpace(startTime)
	endTime := c.Query("end")
	endTime = strings.TrimSpace(endTime)

	// Validate the query params
	if startTime == "" {
		return c.Status(400).JSON(fiber.Map{
			"error":   false,
			"message": "Cần nhập giờ bắt đầu",
		})
	}
	if endTime == "" {
		return c.Status(400).JSON(fiber.Map{
			"error":   false,
			"message": "Cần nhập giờ kết thúc",
		})
	}

	timeFormat := "15:04:05"
	start, err := time.Parse(timeFormat, startTime)
	fmt.Println("Type of start time:", reflect.TypeOf(startTime))
	fmt.Println("Length of start time:", len(startTime))
	fmt.Println("Length of format:", len(timeFormat))
	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error":   true,
			"message": "Sai định dạng thời gian bắt đầu",
		})
	}
	end, err := time.Parse(timeFormat, endTime)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error":   true,
			"message": "Sai định dạng thời gian kết thúc",
		})
	}

	if !start.Before(end) {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error":   true,
			"message": "Thời gian bắt đầu không được lớn hơn thời gian kết thúc.",
		})
	}

	// Open csv file
	file, err := os.Open("./uploads/csvFile.csv")
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error":   true,
			"message": "Failed To Open CSV File",
		})
	}
	defer file.Close()

	// CSV Reader
	reader := csv.NewReader(file)

	// Read the first row from the CSV (header row)
	header, err := reader.Read()
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error":   true,
			"message": "Failed To Read Header",
		})
	}

	var timeIdx, amountIdx int
	for index, header := range header {
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
			"error":   true,
			"message": "Failed To Read CSV File",
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
		if !timeCol.Before(start) && !timeCol.After(end) {
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

	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:5173",
		AllowMethods: "POST, GET, OPTIONS",
		AllowHeaders: "Content-Type, Authorization", // Allow these headers
	}))

	app.Post("/upload", uploadXlsx)
	app.Get("/get-all-data", getAllData)
	app.Get("/query", queryData)

	// app.Listen(":8080")

	// Channel to listen for OS signals
	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, os.Interrupt, syscall.SIGTERM)

	// Start the Fiber server in a goroutine
	go func() {
		if err := app.Listen(":8080"); err != nil {
			fmt.Println("Shutting down server...")
		}
	}()

	// Wait for a signal to terminate the program
	<-sigChan
	fmt.Println("Received shutdown signal. Cleaning up...")

	// Cleanup: Remove files in the uploadPath
	cleanup(uploadPath)
	fmt.Println("Cleanup complete. Shutting down.")
}

var uploadPath = "./uploads"

func cleanup(dir string) {
	files, err := os.ReadDir(dir)
	if err != nil {
		fmt.Println("Error reading directory:", err)
		return
	}

	for _, file := range files {
		filePath := fmt.Sprintf("%s/%s", dir, file.Name())
		if err := os.Remove(filePath); err != nil {
			fmt.Println("Error deleting file:", filePath, err)
		} else {
			fmt.Println("Deleted file:", filePath)
		}
	}
}
