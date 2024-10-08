package main

import (
	"encoding/csv"
	"fmt"
	"os"
	"strings"

	"github.com/xuri/excelize/v2"
)

func convertXlsx(xlsxFile string, csvFile string) error {

	// Open XLSX File
	oFile, err := excelize.OpenFile(xlsxFile)
	if err != nil {
		return fmt.Errorf("failed to open XLSX file: %v", err)
	}

	sheets := oFile.GetSheetList()
	sheet := sheets[0]

	// Create CSV File
	cFile, err := os.Create(csvFile)
	if err != nil {
		return fmt.Errorf("failed to create CSV file: %v", err)
	}
	defer cFile.Close()

	csvWriter := csv.NewWriter(cFile)
	defer csvWriter.Flush()

	// Read rows and find the "STT" row
	rows, err := oFile.GetRows(sheet)
	if err != nil {
		return fmt.Errorf("failed to get rows from sheet: %v", err)
	}

	startWriting := false
	for _, row := range rows {
		if startWriting {
			if err := csvWriter.Write(row); err != nil {
				return fmt.Errorf("error writing to CSV: %v", err)
			}
		} else {
			for _, cell := range row {
				if strings.Contains(cell, "STT") {
					startWriting = true
					if err := csvWriter.Write(row); err != nil {
						return fmt.Errorf("error writing to CSV: %v", err)
					}
					break
				}
			}
		}
	}
	return nil

}
