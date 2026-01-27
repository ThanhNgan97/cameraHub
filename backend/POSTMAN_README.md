# CameraHub Backend Postman Collection

This directory contains a Postman Collection for testing the CameraHub Backend API.

## File
`CameraHub_Backend.postman_collection.json`

## Setup
1. Open Postman.
2. Click **Import** and select the `.json` file.
3. The collection uses the environment variable `{{baseUrl}}` which defaults to `http://localhost:3000/api`.
4. The `Token` variable is automatically set after a successful Login request.

## Available Endpoints Covered
- **Auth**: Register, Login, Get Me
- **Users**: Get All, Get By ID, Update, Delete
- **Shops**: Get All, Get By ID, Create, Update, Delete
- **Admin**: Review stats, Pending shops, Approvals, Reports

## Notes
- **Missing Endpoints**: The backend currently lacks dedicated endpoints for **Products**, **Orders**, and **Reviews** (except for admin approvals), although the database models exist.
- **Product Data**: The `getShopById` endpoint currently does not return the list of products for the shop.
- **Authentication**: Most endpoints require a Bearer token. Use the "Auth > Login" request first to automatically set the token for subsequent requests.
