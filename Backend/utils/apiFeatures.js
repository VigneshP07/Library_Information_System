class APIFeatures{
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search()
    {
        const keyword = this.queryStr.keyword?{
            title:{
                $regex:this.queryStr.keyword,
                $options:"i"
            },
        }:{

        }
        this.query= this.query.find({...keyword});
        return this;
    }

    searchAuth() {
        // console.log("searching...");
        if (typeof this.queryStr.keyword2 === 'string') {
            // Convert the string to an array, considering it might be comma-separated
            const keywordArray = this.queryStr.keyword2.split(',');
            
            // Now check if the keywordArray is non-empty
            if (keywordArray.length > 0) {
                // Map each keyword to a regex object
                const keywordsRegex = keywordArray.map(keyword => ({
                    genre: {
                        $regex: keyword.trim(), // Trim any leading/trailing spaces
                        $options: "i"
                    }
                }));
                // Use $or operator to match any of the keywords
                this.query = this.query.find({ $or: keywordsRegex });
            } else {
                // If keywordArray is empty, just return without filtering
                this.query = this.query.find();
            }
        } else {
            // If keyword2 is not a string, proceed with the existing logic
            if (this.queryStr.keyword2 && Array.isArray(this.queryStr.keyword2)) {
                const keywordsRegex = this.queryStr.keyword2.map(keyword => ({
                    author: {
                        $regex: keyword,
                        $options: "i"
                    }
                }));
                this.query = this.query.find({ $or: keywordsRegex });
            } else {
                this.query = this.query.find();
            }
        }
        return this;
    }
    

    filter() {
        try{
            const queryCopy = { ...this.query };
            if (this.query.genre && Array.isArray(this.query.genre) && this.query.genre.length > 0) {
                queryCopy.genre = { $in: this.query.genre };
            }
            this.query = this.query.find(queryCopy);
            return this;
        }
        catch(err){
            console.error(err);
        }
    }
    

    pagination(resPerPage)
    {
        const currentPage = Number(this.queryStr.page)|| 1;
        const skip = resPerPage * (currentPage - 1);

        this.query = this.query.limit(resPerPage).skip(skip);
        return this;
    }
}

module.exports = APIFeatures;