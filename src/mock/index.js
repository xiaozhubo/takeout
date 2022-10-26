import Mock from "mockjs"
import data from "./mockdata"

Mock.mock("/shopinfo",{code:0, data: data.info})
Mock.mock("/goods",{code:0, data: data.goods})
Mock.mock("/ratings",{code:0, data: data.ratings})