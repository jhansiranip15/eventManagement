# Event Management System

## Introduction

This project is an Event Management System that provides APIs to import events from a CSV file and find events based on user location and date. It is designed to handle bulk imports and efficiently retrieve events sorted by proximity and date.

## Tech Stack and Database Choice

- **Backend**: Node.js with Express framework
- **Database**: MongoDB
- **External APIs**: Weather API and Distance Calculation API

We chose Node.js with Express for its efficiency in handling I/O-bound operations and its non-blocking nature, which is ideal for the event-driven architecture of our application. MongoDB was selected for its ability to handle geospatial queries, scalability, and ease of integration with Node.js.

## Design Decisions and Challenges

- **Bulk Import**: Implemented a POST endpoint to handle CSV uploads and efficiently insert records into MongoDB using `insertMany`.
- **Geospatial Queries**: Utilized MongoDB's geospatial indexing and querying capabilities to find events near the user.
- **Integration with External APIs**: Integrated Weather and Distance Calculation APIs to enrich the event data with real-time information.

Challenges were addressed by:
- Ensuring robust error handling and validation to manage inconsistent data formats and incomplete requests.
- Implementing efficient parsing and processing of CSV files to minimize memory usage and response times.

## Setup and Running the Project

### Prerequisites

- Node.js installed
- MongoDB installed and running
- Access to the external Weather and Distance Calculation APIs

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jhansiranip15/eventManagement.git
   cd event-management-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add your database connection string and API keys:
     ```
     DB_CONNECTION=mongodb://localhost:27017/eventManagement
     WEATHER_API_KEY=your_weather_api_key
     DISTANCE_API_KEY=your_distance_api_key
     ```

4. Run the server:
   ```bash
   npm start
   ```

## API Documentation

### Data Ingestion API

- **Endpoint**: `POST /events/import`
- **Request Body**: A CSV-formatted string containing event data.
- **Response**: 
  - `200 OK`: Events imported successfully.
  - `500 Internal Server Error`: Failed to import events.

### Event Finder API

- **Endpoint**: `GET /events/find`
- **Query Parameters**:
  - `latitude`: User's latitude
  - `longitude`: User's longitude
  - `date`: Specified date (YYYY-MM-DD)
- **Response**:
  - `200 OK`: Returns an array of events sorted by distance and date.
  - `400 Bad Request`: Invalid date format or missing parameters.
  - `500 Internal Server Error`: Failed to retrieve events.
