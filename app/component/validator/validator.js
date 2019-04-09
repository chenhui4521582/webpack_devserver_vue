import Vue from 'vue'
import VeeValidate,{Validator} from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN'
import validateConfig from './validateConif';

Vue.use(VeeValidate,{
    events:'change',
    dictionary: {
        zh_CN
    }
});
for (let i in validateConfig){
    Validator.extend(i, validateConfig[i]);
}


Vue.use(VeeValidate,{events:'Change'});