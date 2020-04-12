'use strict'
const Expense = use('App/Models/Expense');

class DataExpController {
  async dataListPaginator({request, response}){
    //Request parans
    const { users_id } = request.params;
    let   { page, tag, prev_date, curr_date } = request.all()

    //Validation Params
    if(!tag  || tag == 0  || tag == "undefined") tag = false;
    if(!prev_date || prev_date == 0 || prev_date == "undefined") prev_date = false
    if(!curr_date || curr_date == 0 || curr_date == "undefined") curr_date = false
    if(!page || page == 0 || page == "undefined") page = 1;

    //Find Expense and where Tag
    let find = Expense
                      .query()
                      .where({users_id: users_id})
                      .with('tag');

    // //Find Expense and where Tag
    let sumAll = Expense
                      .query()
                      .where({users_id: users_id});

    //Tag == true
    //Add: true search and Sum
    if(tag){
      find.whereHas('tag', (builder) => {
          builder.where({tag_id: tag}, true)
      });

      sumAll.whereHas('tag', (builder) => {
        builder.where({tag_id: tag}, true)
      });
    }

    //Prev and Curr Date == True
    //Add: Search range date and Sum
    if(prev_date && curr_date){
      prev_date = prev_date.replace(/[^0-9]+/g, "");
      curr_date = curr_date.replace(/[^0-9]+/g, "");
      find.whereBetween("range", [prev_date, curr_date]);
      sumAll.whereBetween("range", [prev_date, curr_date]);
    }

    //Find and Sum All Query
    find = await find.paginate(page, 10);
    sumAll = await sumAll.sum("value").first();
    //Delete tag isOne
    delete find["isOne"]

    //Payload Response Client
    const payload = {
      ...find.pages,
      rows: [
          ...find.rows
      ]
    };

    //Return Json
    return response.status(200).json({
      status: 200,
      response: payload
    });
  }
}

module.exports = DataExpController
