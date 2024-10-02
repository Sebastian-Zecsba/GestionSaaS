export class CategoryDto { 
    private constructor(
        public name: string,
        public description: string
    ){}

    static create(object: {[key:string]:any}) : [string?, CategoryDto?]{

        const { name, description } = object;

        if(!name) return ['Nombre de la catergoria es obligatorio']
        if(!description) return ['Descripción de la categoria es obligatorio']

        return [undefined, new CategoryDto(name, description)]
    }
}