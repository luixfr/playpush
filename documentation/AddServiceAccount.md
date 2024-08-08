# Adding a Service Account to Google Play Console for Bundle Publishing
Note: To publish bundles to the Google Play Store, your service account will need the Admin role for the specific app.

## Steps:
### Obtain the Service Account Email Address:

* This is the email address associated with your service account. You can find it in the Google Cloud Console under the service account's details.

### Access Google Play Console:

* Log in to your Google Play Console account.

### Navigate to Users & Permissions:

* Go to the "Settings" menu and select "Users & Permissions."

### Invite New User:

* Click on the "Invite New Users" button.

### Enter Service Account Email:

* Paste the service account email address into the provided field.

### Add App Permissions:

* Click the "Add App" button.
* Select the app(s) you want the service account to manage.

### Grant Admin Privileges:

* Select the "Admin (all permissions)" checkbox for the desired app(s).
* Click "Apply."

### Send Invitation:

* Click the "Invite User" button and confirm by pressing "Send Invite."

## Important Considerations:
* Security: Granting the "Admin" role provides extensive permissions. Ensure you trust the service account and its associated project.
* Best Practices: Consider using more granular permissions if possible to limit the service account's access.
* API Usage: Be aware of potential API usage limits and quotas when using the service account for automation.


By following these steps, you'll successfully grant your service account the necessary permissions to publish bundles to the Google Play Store.