# User Journey

The user journey outlines the key steps a user takes to interact with the calendar sharing application:

1. **Registration/Login**: New users create an account with email and password. Existing users log in to access their dashboard.

2. **Personal Calendar View**: After login, users are presented with their personal calendar showing the current year and the next 3 years. The calendar starts blank.

3. **Adding Events Manually**:
   - User selects a date on the calendar.
   - Enters event details: start date (pre-filled), optional end date, event name, and optional details.
   - Saves the event, which appears on the calendar with the user's name as creator.

4. **Uploading Events via Excel**:
   - User navigates to the upload section.
   - Selects and uploads an Excel file with columns for start-date, end-date (optional), event name, and details.
   - System processes the file, validates data, and adds events to the calendar.
   - Events are attributed to the uploading user.

5. **Sharing Calendar**:
   - User accesses sharing settings for their calendar.
   - Searches for other users by email or username.
   - Grants view-only or view-and-edit permissions to selected users.

6. **Viewing Shared Calendars**:
   - User sees a list of calendars shared with them.
   - Selects a shared calendar to view in read-only mode or edit mode based on permissions.
   - Events display the creator's name.

7. **Editing Shared Calendars** (if edit permission granted):
   - User can add, edit, or delete events on the shared calendar.
   - New events are attributed to the editing user.

8. **Managing Permissions**:
   - User can revoke access or change permissions for shared calendars at any time.

9. **Logout**: User logs out to secure their session.