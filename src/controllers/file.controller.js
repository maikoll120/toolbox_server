export const getAll = async (req, res, next) => {
  try {
    res.send('List all files!!!')
  } catch (error) {
    next(error)
  }
}
