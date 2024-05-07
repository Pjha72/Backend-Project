// By using promises
const asyncHandler = (reqHandler) =>{
    (req,res,next)=>{
        Promise.resolve(reqHandler(req,res,next)).catch((err) => next(err))
    }
}

export default asyncHandler

// Example 
// const asyncHandler = (fn) => {}
// const asyncHandler = (fn) => () => {}
// const asyncHandler = (fn) =>  async () => {}

// By Using Try & Catch
// const asyncHandler = (func) => async (req,res,next) =>{
//     try {
//         await func(req,res,next)
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }
