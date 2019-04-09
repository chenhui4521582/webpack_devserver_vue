export default {
    mobile:{
        validate: value => {
            value.length === 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
        },
        messages: {
            en:field => field + '必须是11位手机号码',
        }
    },
    user:{
        validate: value =>{
            value == 'tom'
        }
    }
}