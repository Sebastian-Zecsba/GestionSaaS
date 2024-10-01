export class PaginationDto{
    private constructor(
        public readonly page: number,
        public readonly limit: number,
        public readonly searchTerm?: string
    ){}

    static create(page: number = 1, limit: number = 10, searchTerm: string = '') : [string?, PaginationDto?] {

        if (isNaN(page) || isNaN(limit)) return ['Page and limit must be numbers']
        if(page <= 0) return ['Page must be greater than 0']
        if(limit <= 0) return ['Limit must be greater than 0']
        if(searchTerm.length > 100) return ['Search term must be less than 100 characters']

        return [undefined, new PaginationDto(page, limit, searchTerm)]
    }

}