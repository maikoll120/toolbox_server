import axios from 'axios'
import { API_KEY, FILE_HEADER_FORMAT } from '../lib/config.js'

export const getAll = async (req, res, next) => {
  try {
    const response = await axios.get('https://echo-serv.tbxnet.com/v1/secret/files', { headers: { Authorization: API_KEY } })

    const fileNameList = response.data.files

    const fileList = await Promise.allSettled(fileNameList.map((fileName) => {
      return axios.get(`https://echo-serv.tbxnet.com/v1/secret/file/${fileName}`, { headers: { Authorization: API_KEY } })
    }))

    const validFileList = []

    fileList.forEach(file => {
      if (file.status !== 'fulfilled') { return }

      const fileData = file.value.data
      const fileLines = fileData.split('\n')

      if (fileLines.length < 2 || fileLines[0] !== FILE_HEADER_FORMAT) { return }

      let fileName = ''
      const validFileLines = []

      for (let index = 1; index < fileLines.length; index++) {
        const fileLine = fileLines[index].split(',')

        if (fileLine.length !== 4) { continue }

        fileName = fileLine[0]
        validFileLines.push({
          text: fileLine[1],
          number: fileLine[2],
          hex: fileLine[3]
        })
      }

      if (validFileLines.length === 0) { return }

      validFileList.push(
        {
          file: fileName,
          lines: validFileLines
        }
      )
    })

    res.send(validFileList)
  } catch (error) {
    next(error)
  }
}
