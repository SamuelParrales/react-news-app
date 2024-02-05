export class Dictionary{
    static convert(data=[],key){
   
        const dict = {};
        if(data.length==0){
            throw new Error(`Data doesn't have elements`)
        }
        if(!Object.hasOwn(data[0],key)){
            throw new Error(`You must pass a valid key`);
        }

        for (const d of data){
            dict[d[key]] = d;
        }
        return dict;
    }
}