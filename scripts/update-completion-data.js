const { google } = require('googleapis');
const fs = require('fs').promises;

async function updateCompletionData() {
    try {
        // Initialize Google Sheets API
        const auth = new google.auth.JWT(
            process.env.GOOGLE_CLIENT_EMAIL,
            null,
            process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            ['https://www.googleapis.com/auth/spreadsheets.readonly']
        );

        const sheets = google.sheets({ version: 'v4', auth });
        
        // Fetch data from Google Sheets
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.SHEET_ID,
            range: process.env.SHEET_NAME
        });

        // Save to JSON file
        await fs.writeFile(
            'data/completion-data.json',
            JSON.stringify({ values: response.data.values }, null, 2)
        );

        console.log('Completion data updated successfully');
    } catch (error) {
        console.error('Error updating completion data:', error);
        process.exit(1);
    }
}

updateCompletionData(); 