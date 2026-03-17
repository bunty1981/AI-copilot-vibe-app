# User Journey

## Overview
The user journey for the Calendar Sharing PWA outlines the key interactions and workflows that users will experience when using the application. This document focuses on the primary user personas: the calendar owner and the shared user (viewer or editor).

## Primary User Personas
1. **Calendar Owner**: A user who creates and manages their own calendar, can share it with others, and controls access permissions.
2. **Shared User**: A user who has been granted access to view or edit another user's calendar.

## User Journey Scenarios

### Scenario 1: New User Onboarding and Calendar Creation
1. User visits the PWA website and sees a landing page explaining the app's features.
2. User clicks "Sign Up" and provides basic information (email, password, name).
3. Upon successful registration, user is logged in and presented with a blank calendar view showing the current year and next 3 years.
4. User sees an empty calendar grid with month/week/day views available.
5. User is prompted to add their first event or upload an Excel file.

### Scenario 2: Manual Event Creation
1. From the calendar view, user clicks on a specific date or uses an "Add Event" button.
2. A modal/form appears with fields for:
   - Event name (required)
   - Start date (pre-filled with selected date)
   - End date (optional)
   - Event details (optional)
3. User fills in the information and saves the event.
4. Event appears on the calendar with the user's name as the creator.
5. User can edit or delete the event later by clicking on it.

### Scenario 3: Excel Upload for Bulk Event Creation
1. User navigates to the "Import" or "Upload" section.
2. User selects an Excel file with the required format (start-date, end-date, event name, details).
3. System validates the file format and data.
4. User confirms the import, and events are added to the calendar.
5. User sees a summary of imported events and any errors.
6. Events appear on the calendar with the user's name as creator.

### Scenario 4: Sharing a Calendar
1. From the calendar management page, user clicks "Share Calendar".
2. User enters the email or username of the person to share with.
3. User selects permission level: "View Only" or "View and Edit".
4. System sends an invitation to the shared user.
5. Shared user receives notification and can accept the invitation.

### Scenario 5: Viewing a Shared Calendar (View-Only)
1. Shared user logs in and sees a list of calendars shared with them.
2. User selects a shared calendar to view.
3. Calendar displays with all events, showing the creator's name for each event.
4. User can navigate through dates but cannot add, edit, or delete events.
5. User can switch between different shared calendars.

### Scenario 6: Editing a Shared Calendar (View-and-Edit)
1. Shared user with edit permissions selects a shared calendar.
2. User can add new events (which will show their name as creator).
3. User can edit events they created or have permission to edit.
4. User cannot delete events created by the calendar owner (unless granted specific permission).
5. All changes are reflected in real-time for other viewers.

### Scenario 7: Managing Calendar Permissions
1. Calendar owner navigates to calendar settings.
2. Owner sees a list of users with access and their permission levels.
3. Owner can change permissions or revoke access for any user.
4. Changes take effect immediately.

### Scenario 8: Calendar Navigation and Views
1. User can switch between month, week, and day views.
2. User can navigate to different years within the 4-year range.
3. User can search for events by name or date.
4. User can filter events by creator (useful for shared calendars).

## Edge Cases and Error Handling
- Invalid Excel file format: User receives clear error message with format requirements.
- Attempting to edit without permission: User sees appropriate error message.
- Network connectivity issues: App works offline for viewing, syncs when online.
- Conflicting events: System allows overlapping events but may warn for scheduling conflicts.

## Progressive Enhancement
As a PWA, the app provides:
- Offline viewing of calendars
- Push notifications for calendar updates
- Installable on mobile devices
- Responsive design for all screen sizes