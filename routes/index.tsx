import type { Handler, Handlers, PageProps } from "$fresh/server.ts";
import type ApiResponse from "./interfaces.ts";
import _interfaces from "./interfaces.ts";

const endpoint = "https://api-open.data.gov.sg/v2/real-time/api/uv";

const getYesterdayDate = (): string => {
  const today = new Date();
  today.setDate(today.getDate() - 1); // Subtract one day
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getTodayDate = (): string => {
  const today = new Date();
  today.setDate(today.getDate()); // Subtract one day
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const todayDate = getTodayDate()
const ytdDate = getYesterdayDate()

export const handler: Handlers = {
  async GET(req, ctx) {
    console.log("handler called.");

    const url = new URL(req.url);
    const query = url.searchParams.get("q") || todayDate;
    const resp = await fetch(`${endpoint}?date=${query}`);
    if (resp.status == 200) {
      const apiResponse: ApiResponse = await resp.json();
      console.log("API called success, date " + query);
      console.log(apiResponse);

      // From the apiResponse, we will search and append values of UVIndex from 7am to the latest hour updated
      console.log("the length of the list, number of hours we have is:");
      console.log(apiResponse.data.records[0].index.length); 
      const finalList: any[] = [];
      for (let i = apiResponse.data.records[0].index.length - 1; i >= 0; i--) {
        finalList.push(apiResponse.data.records[0].index[i].value);
      } // at this point, the latest hour is the first element while the earliest hour is the last element
      finalList.unshift(apiResponse.data.records[0].date);

      while (finalList.length < 13) {
        // we need to append NA to hit 12 units. not 13 as we are not using 7pm uvindex.
        finalList.push("N/A");
      }
      console.log("final list is:");
      console.log(finalList);
      //the following variable will be in the PageProps.data
      return ctx.render({ finalList });
    }
    console.log(resp)
    console.log("API called failed, date and status code " + query + " " + resp.status);
    console.log("the length of the list, number of hours we have is:");
    return ctx.render({ result: null });
  },
};

interface ApiProps {
  data: ApiResponse | null;
}

interface ApiProps2 {
  myFinalList: any[] | null;
}

function UVIndex({ myFinalList }: ApiProps2) {
  console.log("UVIndex.myFinaList is:");
  console.log(myFinalList);
  if (myFinalList == null || myFinalList.length == 0) {
    return (
      <div>
        Date not found!
      </div>
    );
  }

  return (
    <div>
      <div class="stats stats-vertical shadow m-2">
        <div class="stat">
          <div class="stat-title">7AM</div>
          <div class="stat-value">{myFinalList[1]}</div>
          <div class="stat-desc">UVIndex</div>
        </div>

        <div class="stat">
          <div class="stat-title">8AM</div>
          <div class="stat-value">{myFinalList[2]}</div>
          <div class="stat-desc">UVIndex</div>
        </div>

        <div class="stat">
          <div class="stat-title">9AM</div>
          <div class="stat-value">{myFinalList[3]}</div>
          <div class="stat-desc">UVIndex</div>
        </div>

        <div class="stat">
          <div class="stat-title">10AM</div>
          <div class="stat-value">{myFinalList[4]}</div>
          <div class="stat-desc">UVIndex</div>
        </div>

        <div class="stat">
          <div class="stat-title">11AM</div>
          <div class="stat-value">{myFinalList[5]}</div>
          <div class="stat-desc">UVIndex</div>
        </div>

        <div class="stat">
          <div class="stat-title">12PM</div>
          <div class="stat-value">{myFinalList[6]}</div>
          <div class="stat-desc">UVIndex</div>
        </div>
      </div>
      <div class="stats stats-vertical shadow m-2">
        <div class="stat">
          <div class="stat-title">1PM</div>
          <div class="stat-value">{myFinalList[7]}</div>
          <div class="stat-desc">UVIndex</div>
        </div>

        <div class="stat">
          <div class="stat-title">2PM</div>
          <div class="stat-value">{myFinalList[8]}</div>
          <div class="stat-desc">UVIndex</div>
        </div>

        <div class="stat">
          <div class="stat-title">3PM</div>
          <div class="stat-value">{myFinalList[9]}</div>
          <div class="stat-desc">UVIndex</div>
        </div>

        <div class="stat">
          <div class="stat-title">4PM</div>
          <div class="stat-value">{myFinalList[10]}</div>
          <div class="stat-desc">UVIndex</div>
        </div>

        <div class="stat">
          <div class="stat-title">5PM</div>
          <div class="stat-value">{myFinalList[11]}</div>
          <div class="stat-desc">UVIndex</div>
        </div>

        <div class="stat">
          <div class="stat-title">6PM</div>
          <div class="stat-value">{myFinalList[12]}</div>
          <div class="stat-desc">UVIndex</div>
        </div>

        {
          /* <div class="stat">
          <div class="stat-title">7PM</div>
          <div class="stat-value">{data.data.records[0].index[0].value}</div>
          <div class="stat-desc">UVIndex</div>
        </div> */
        }
      </div>
    </div>
  );
}

export default function Home({ data }: PageProps<any>) {
  const myList = data.finalList;
  console.log("Home myList:");
  console.log(myList);
  // this dataDate logic does not work so commenting out, we will read directly from List[0]
  // let dataDate = todayDate;
  // if (data != null && data.myList != null && data.myList.length > 0) {
  //   dataDate = myList[0];
  // } else {
  //   dataDate = "dd/mm/yyyy";
  // }
  return (
    <div class="flex justify-center">
      <div class="card bg-base-200 w-96 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">SG UV Index</h2>
          <i>The sun is a deadly lazer.</i>
          <div class="overflow-x-auto">
            <table class="table">
              <thead>
                <tr>
                  <th></th>
                  <th>Risk</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>0-2</th>
                  <td>Low</td>
                  <td>No protection needed</td>
                </tr>
                <tr>
                  <th>3-5</th>
                  <td>Moderate</td>
                  <td>Use sunscreen and sunglasses.</td>
                </tr>
                <tr>
                  <th>6-7</th>
                  <td>High</td>
                  <td>
                    Wear protective clothing, stay in shade during midday.
                  </td>
                </tr>
                <tr>
                  <th>8+</th>
                  <td>Extreme</td>
                  <td>Avoid sun.</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* <label for="start">Date:</label> */}
          {
            /* <input
            name="qtown"
            type="text"
            placeholder="Search for a town!"
            class="input input-bordered"
          >
          </input> */
          }
          <div class="card-actions justify-center">
            <form>
              <input type="date" id="start" name="q" value={myList[0]} />
              <div>
                <button class="btn btn-primary m-2" type="submit">
                  Search Date
                </button>
              </div>
            </form>
          </div>
        </div>
        <div class="flex w-full flex-col border-opacity-50">
          <div class="card bg-base-300 rounded-box grid h-20 place-items-center">Your chosen date: {myList[0]}</div>
        </div>
        <div class="flex justify-center m-2">
          <UVIndex myFinalList={data.finalList} />
        </div>
      </div>
    </div>
  );
}
