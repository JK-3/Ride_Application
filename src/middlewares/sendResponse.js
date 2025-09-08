// dhaval
export const sendResponse = (req, res) => {    
    if (!req.responseData) {
        return res.status(500).json({
            success: false,
            error: "No response"
        });
    }

    const { status = 200, data = null, error = null, message = null } = req.responseData;

    if (error) {

        console.error("API Error:", error);
        return res.status(status).json({
            success: false,
            message,
            error
        });
    }

    return res.status(status).json({
        success: true,
        message,
        data
    });
};