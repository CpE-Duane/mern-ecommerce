import  mongoose  from 'mongoose';

const productSchema = mongoose.Schema(
     {
          name: {
               type: String,
               required: true
          },
          slug: {
               type: String,
               required: true,
          },
          description: {
               type: String,
               required: true,
          },
          price: {
               type: Number,
               required: true,
          },
          category: {
               type: mongoose.ObjectId,
               required: true,
               ref: "Category"
          },
          quantity: {
               type: Number,
               required: true,
          },
          photo: {
               data: Buffer,
               contentType: String
          },
          shipping: {
               type: Boolean,
          }

     },
     { timestamps: true }
)

const Product = mongoose.model("Product", productSchema)

export default Product