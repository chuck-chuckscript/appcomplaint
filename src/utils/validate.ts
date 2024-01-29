 class Validate{
    isCyrillic(str: string){
        let result = str.replace(/[а-яА-я -]/g, '')


        if(result.length > 0){
            return false;
        }
        return true;
    }

}
export default new Validate()
