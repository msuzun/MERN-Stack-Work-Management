import moment from 'moment'
export const getAntdFormInputRules = [
    {
        required:true,
        message:"Required"
    }
]
export const getDateFormat = date => moment(date).format("MMMM Do YYYY, h:mm A");
