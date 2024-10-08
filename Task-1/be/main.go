package main

import (
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/xuri/excelize/v2"
)

func uploadXlsx(c *fiber.Ctx) error {

	// Parse file
	file, err := c.FormFile("file")
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": true, "msg": "File Not Found"})
	}

	// Save file
	uploadPath := fmt.Sprintf("./uploads/%s", file.Filename)
	err = c.SaveFile(file, uploadPath)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": true, "msg": "Unable to save file"})
	}

	// Open file
	xlFile, err := excelize.OpenFile(uploadPath)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": true, "msg": "Failed to open file"})
	}

	// Get name
	name := xlFile.GetSheetList()
	if len(name) == 0 {
		return c.Status(500).JSON(fiber.Map{"error": true, "msg": "No sheets found in the file"})
	}

	rows, err := xlFile.GetRows(name[0])
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": true, "msg": "Failed to read rows"})
	}

	for i, _ := range rows {
		if i < 8 {
			continue // Skip metadata rows
		}
	}

	// return c.SendString("File uploaded and processed successfully")
	return c.Status(200).JSON(fiber.Map{
		"error": false,
		"msg":   "File uploaded and processed successfully",
	})
}

func main() {
	fmt.Print("Hello")
	app := fiber.New()

	app.Get("/", func(c *fiber.Ctx) error {
		return c.Status(200).JSON(fiber.Map{"msg": "Hello"})
	})

	app.Post("/upload", uploadXlsx)

	log.Fatal(app.Listen(":4000"))
}
