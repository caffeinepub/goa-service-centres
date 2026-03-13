# GOA Service Centres

## Current State
New project, no existing code.

## Requested Changes (Diff)

### Add
- Home page listing 5 services: AC Repair, Refrigerator Repair, Washing Machine Repair, Microwave Repair, Water Purifier Repair
- Each service is a clickable card that navigates to a service request form
- Service request form with fields: Name, Phone, Address, Problem Description
- Submit button that saves the request to the backend and shows a success message
- Backend stores service requests with: serviceName, name, phone, address, problemDescription, timestamp

### Modify
N/A

### Remove
N/A

## Implementation Plan
1. Backend: Motoko canister with `submitServiceRequest` and `getServiceRequests` functions
2. Frontend: Home page with service cards, ServiceForm page with form fields and submission
