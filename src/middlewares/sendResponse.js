export const sendResponse = (req, res) => {    
    if (!req.responseData) {
        return res.status(500).json({
            success: false,
            error: "No response"
        });
    }

    const { status = 200, data = null, error = null } = req.responseData;

    if (error) {

        console.error("API Error:", error);
        return res.status(status).json({
            success: false,
            error
        });
    }

    return res.status(status).json({
        success: true,
        data
    });
};