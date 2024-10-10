package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
)

// type: "1" | "2"
// range: [l, r]
type Query struct {
	Type  string `json:"type"`
	Range []int  `json:"range"`
}

// token: string
// data: number[]
// query: {}[]
type InputData struct {
	Token string  `json:"token"`
	Data  []int   `json:"data"`
	Query []Query `json:"query"`
}

func main() {
	getURL := "https://test-share.shub.edu.vn/api/intern-test/input"
	res, err := http.Get(getURL)
	if err != nil {
		log.Fatalf("Get Input: %v", err)
	}
	defer res.Body.Close()

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		log.Fatalf("Response Body of getURL: %v", err)
	}

	var inputData InputData
	err = json.Unmarshal(body, &inputData)
	if err != nil {
		log.Fatalf("Error parsing JSON: %v", err)
	}

	n := len(inputData.Data)
	prefix_1 := make([]int, n+1)
	prefix_2 := make([]int, n+1)

	for i := 0; i < n; i++ {
		// Type 1
		prefix_1[i+1] = prefix_1[i] + inputData.Data[i]

		// Type 2
		if i%2 == 0 {
			prefix_2[i+1] = prefix_2[i] + inputData.Data[i]
		} else {
			prefix_2[i+1] = prefix_2[i] - inputData.Data[i]
		}
	}

	results := make([]int, len(inputData.Query))
	for i, query := range inputData.Query {
		l, r := query.Range[0], query.Range[1]
		if query.Type == "1" {
			results[i] = prefix_1[r+1] - prefix_1[l]
		} else if query.Type == "2" {
			results[i] = prefix_2[r+1] - prefix_2[l]
		}
	}

	jsonData, err := json.Marshal(results)
	if err != nil {
		log.Fatalf("Convert to JSON: %v", err)
	}

	postURL := "https://test-share.shub.edu.vn/api/intern-test/output"
	req, err := http.NewRequest("POST", postURL, bytes.NewBuffer(jsonData))
	if err != nil {
		log.Fatalf("Create POST Request: %v", err)
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", inputData.Token))

	client := &http.Client{}
	res, err = client.Do(req)
	if err != nil {
		log.Fatalf("Send POST Request: %v", err)
	}
	defer res.Body.Close()

	body, err = ioutil.ReadAll(res.Body)
	if err != nil {
		log.Fatalf("Response Body of getURL %v:", err)
	}
	fmt.Printf("Server: %s\n", string(body))
}
