export class CategoryDto { 
    private constructor(
        public name: string,
        public description: string
    ){}

    static create(object: {[key:string]:any}) : [string?, CategoryDto?]{

        const { name, description } = object;

        if(!name) return ['Missing category name']
        if(!description) return ['Missing category description']

        return [undefined, new CategoryDto(name, description)]
    }
}