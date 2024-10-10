[Return to README.md](https://github.com/ume-meu/shub-test/blob/main/README.md)

<div align="left">
  <img src="https://img.shields.io/badge/-🐾 ume_meu 🐾-e3d6f6?style=flat&logo=per" alt="Badge">
</div>

## 📊 Range Query Algorithm

This project processes range queries on an array of non-negative integers using Go. It retrieves input data via API, calculates results based on query types, and sends the results back using Bearer Authentication.

### ✨ Features

**🔄 Query Types:**
  - **Type 1:** Sum of elements in a given range.
  - **Type 2:** Alternating sum and subtraction of even and odd indexed elements in the range.

### 🛠 Technologies Used

👩‍💻 **Programming Language:** Go

### 🚀 Installation

Run the application:
   ```bash
   go run main.go
   ```

### 🎯 Usage

1. The program fetches input data from the API.
2. It calculates results based on range queries.
3. Results are sent back to the server via a POST request with Bearer Authentication.
