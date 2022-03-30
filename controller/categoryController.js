const Category = require("../model/category");

function createCategories(categories, parentId = null) {
    const categoryList = [];
    let category;
    if (parentId == null) {
        // fetching all parent categories
        category = categories.filter((cat) => cat.parentId == undefined);
    } else {
        category = categories.filter((cat) => cat.parentId == parentId);
    }
    for (cate of category) {
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            children: createCategories(categories, cate._id),
        });
    }

    return categoryList;
}

exports.addCategory = (req, res) => {
    const categoryObj = {
        name: req.body.name,
    };
    if (req.body.parentId) {
        categoryObj.parentId = req.body.parentId;
    }
    const cat = new Category(categoryObj);
    cat.save((error, category) => {
        if (error) return res.status(400).json({ error });
        if (category) {
            return res.status(200).json({ category });
        }
    });
};

exports.getCategories = (req, res) => {
    Category.find({}).exec((error, categories) => {
        if (error) return res.status(400).json({ error });
        if (categories) {
            console.log(categories)
            const categoryList = createCategories(categories);

            res.status(200).json({ categoryList });
        }
    });
};
