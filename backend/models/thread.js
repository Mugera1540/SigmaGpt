import mongoose from "mongoose"

const MessageSchema=new mongoose.Schema({
    role:{
        type:String,
        enum :["user","assistant"],
        required:true
    },
    content:{
        type :String,
        required:true
    },
    timestamp:{
        type :Date,
        default :Date.now
    }
});

const ThreadSchema =new mongoose.Schema({
    threadId :{ 
        type:String,
        required:true,
        unique:true

    },
    title :{
        type:String,
        default:"New Chat"
    },
    messages :[MessageSchema],
    createdAt:{
        type:Date,
        default:Date.now

    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
})
export default mongoose.model("Thread",ThreadSchema);



/////////////////////////////////////

// import { Sequelize, DataTypes } from "sequelize";

// const sequelize = new Sequelize("your_database_name", "your_mysql_user", "your_mysql_password", {
//   host: "localhost",
//   dialect: "mysql"
// });

// const Message = sequelize.define("Message", {
//   role: {
//     type: DataTypes.ENUM("user", "assistant"),
//     allowNull: false
//   },
//   content: {
//     type: DataTypes.TEXT,
//     allowNull: false
//   },
//   timestamp: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW
//   }
// }, {
//   timestamps: false
// });

// const Thread = sequelize.define("Thread", {
//   threadId: { 
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true
//   },
//   title: {
//     type: DataTypes.STRING,
//     defaultValue: "New Chat"
//   },
//   createdAt: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW
//   },
//   updatedAt: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW
//   }
// }, {
//   timestamps: false
// });

// // Relation: Thread has many Messages
// Thread.hasMany(Message, { as: "messages", foreignKey: "threadIdRef", onDelete: "CASCADE" });
// Message.belongsTo(Thread, { foreignKey: "threadIdRef" });

// export { sequelize, Thread, Message };
