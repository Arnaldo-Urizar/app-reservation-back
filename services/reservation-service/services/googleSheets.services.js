const { google } = require('googleapis');
require('dotenv').config()

async function AddReservation (auth, dataForm){
    try {
        const service = google.sheets({version: 'v4',auth})
        const spreadsheetId = process.env.SPREADSHEET_ID;

        const values =[
            [dataForm.customer, dataForm.people,dataForm.reason, dataForm.date,dataForm.time, dataForm.email]
        ]
        const resource = {
            values,
        }
        const request = {
            spreadsheetId,
            range: "Hoja 1!B4:G4",
            valueInputOption: "USER_ENTERED",  // Adapta los datos ingresados al formato correspondiente ("4" --> 4)
            resource
        }
        // Llama a la API para añadir los datos al final de la hoja
        const response = await service.spreadsheets.values.append(request)

        if(response.status == 200){
            return dataForm
        }{
            throw Error('No se pudo agregar los datos al excel')
        }
    } catch (e) {
        console.error("No se pudo realizar la persistencia de datos: ", e) 
    }
}

module.exports = AddReservation