import { router as fileRoute } from './file.route.js'

export default function (app) {
  app.use('/files', fileRoute)
}
