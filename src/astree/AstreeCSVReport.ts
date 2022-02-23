import * as fs from 'fs'
import * as path from 'path'
import {parse} from 'csv-parse'

type WorldCity = {
  name: string
  country: string
  subCountry: string
  geoNameId: number
}

export class AstreeCSVReport {
  csv_file: string
  csv_file_format: string

  // Normal signature with defaults
  constructor(csvFile: string, csvFileFormat: string) {
    this.csv_file = csvFile
    this.csv_file_format = csvFileFormat
  }

  loadFile(): void {
    const file: string = fs.readFileSync(this.csv_file, 'utf-8')
    const csvFilePath = path.resolve(__dirname, 'files/world-cities_csv.csv')

    const headers = ['name', 'country', 'subCountry', 'geoNameId']

    const fileContent = fs.readFileSync(csvFilePath, {encoding: 'utf-8'})

    parse(
      fileContent,
      {
        delimiter: ',',
        columns: headers
      },
      (error, result: WorldCity[]) => {
        if (error) {
          console.error(error)
        }

        console.log('Result', result)
      }
    )
  }
}
