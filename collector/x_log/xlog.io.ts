type XOutputType = "Number" | "String" | "Object"

type XOutputItem = {
    item: string,
    type: XOutputType,
    childItem: XOutputItem | null
}

type XOutput = {
    length: number;
    [index: number]: XOutputItem
    push(xOutputItem: XOutputItem): void;
}



class XlogIo {
    x_stream: XOutput = [];

    //Input X_Stream

    input(input: Number | String | Array<string>): this{
        let childItem: XOutputItem | null = null;

        switch (typeof input){
            case "number":
                this.x_stream.push(this.inputNumber(input));
                break;
        }

        return this;
    }

    inputNumber(input: Number): XOutputItem{
        return {
            item: String(input),
            type: "Number",
            childItem: null
        }
    }




    //Output X_Stream

    output(): void{
        for (var i = 0; i < this.x_stream.length; i++){
            let stream_item: XOutputItem = this.x_stream[i];

            if(stream_item.childItem == null){
                switch (stream_item.type){
                    case "Number":
                        this.outputNumber(stream_item.item, true)
                        break;
                }
            }
        }
    }

    outputNumber(data:string, withType:boolean = false): boolean{
        try{
            if(withType){
                console.log("Number: " + data)
            } else {
                console.log(data)
            }
        } catch (e){
            console.log(e);
            return true;
        }

        return true;
    }
}


export default new XlogIo;