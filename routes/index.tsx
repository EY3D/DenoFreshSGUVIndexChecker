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

const ytdDate = getYesterdayDate();

export const handler: Handlers = {
  async GET(req, ctx) {
    console.log("handler called.");

    const url = new URL(req.url);
    const query = url.searchParams.get("q") || ytdDate;
    const resp = await fetch(`${endpoint}?date=${query}`);
    if (resp.status == 200) {
      const result: ApiResponse = await resp.json();
      console.log("API called success, date " + query);
      // console.log(result);
      return ctx.render({ result });
    }
    console.log("API called failed, date " + query);
    return ctx.render({ result: null });
  },
};

console.log(getYesterdayDate()); // Output: Yesterday's date in YYYY-MM-DD format

interface ApiProps {
  data: ApiResponse | null;
}

function UVIndex({ data }: ApiProps) {
  if (!data) {
    return (
      <div>
        Date not found!
      </div>
    );
  }

  return (
    <div>
      <div class="stats stats-vertical shadow">
        <div class="stat">
          <div class="stat-title">7AM</div>
          <div class="stat-value">{data.data.records[0].index[12].value}</div>
          <div class="stat-desc">UVIndex</div>
        </div>

        <div class="stat">
          <div class="stat-title">8AM</div>
          <div class="stat-value">{data.data.records[0].index[11].value}</div>
          <div class="stat-desc">UVIndex</div>
        </div>

        <div class="stat">
          <div class="stat-title">9AM</div>
          <div class="stat-value">{data.data.records[0].index[10].value}</div>
          <div class="stat-desc">UVIndex</div>
        </div>

        <div class="stat">
          <div class="stat-title">10AM</div>
          <div class="stat-value">{data.data.records[0].index[9].value}</div>
          <div class="stat-desc">UVIndex</div>
        </div>

        <div class="stat">
          <div class="stat-title">11AM</div>
          <div class="stat-value">{data.data.records[0].index[8].value}</div>
          <div class="stat-desc">UVIndex</div>
        </div>

        <div class="stat">
          <div class="stat-title">12PM</div>
          <div class="stat-value">{data.data.records[0].index[7].value}</div>
          <div class="stat-desc">UVIndex</div>
        </div>
      </div>
      <div class="stats stats-vertical shadow">
        <div class="stat">
          <div class="stat-title">1PM</div>
          <div class="stat-value">{data.data.records[0].index[6].value}</div>
          <div class="stat-desc">UVIndex</div>
        </div>

        <div class="stat">
          <div class="stat-title">2PM</div>
          <div class="stat-value">{data.data.records[0].index[5].value}</div>
          <div class="stat-desc">UVIndex</div>
        </div>

        <div class="stat">
          <div class="stat-title">3PM</div>
          <div class="stat-value">{data.data.records[0].index[4].value}</div>
          <div class="stat-desc">UVIndex</div>
        </div>

        <div class="stat">
          <div class="stat-title">4PM</div>
          <div class="stat-value">{data.data.records[0].index[3].value}</div>
          <div class="stat-desc">UVIndex</div>
        </div>

        <div class="stat">
          <div class="stat-title">5PM</div>
          <div class="stat-value">{data.data.records[0].index[2].value}</div>
          <div class="stat-desc">UVIndex</div>
        </div>

        <div class="stat">
          <div class="stat-title">6PM</div>
          <div class="stat-value">{data.data.records[0].index[1].value}</div>
          <div class="stat-desc">UVIndex</div>
        </div>

        {/* <div class="stat">
          <div class="stat-title">7PM</div>
          <div class="stat-value">{data.data.records[0].index[0].value}</div>
          <div class="stat-desc">UVIndex</div>
        </div> */}
      </div>
    </div>
  );
}

export default function Home({ data }: PageProps<any>) {
  let dataDate = ytdDate
  if (data.result != null){
    dataDate = data.result.data.records[0].date
  }
  else{
    dataDate = "dd/mm/yyyy"
  }
  return (
    <div class="h-screen flex items-center justify-center">
      <div class="card bg-base-200 w-96 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">SG UV Index</h2>
          <p>Do you need sunscreen?</p>
          <label for="start">Date:</label>
          {
            /* <input
            name="qtown"
            type="text"
            placeholder="Search for a town!"
            class="input input-bordered"
          >
          </input> */
          }
          <div class="card-actions justify-end">
            <form>
              <input type="date" id="start" name="q" value={dataDate}/>
              <button class="btn btn-primary" type="submit">Search</button>
            </form>
          </div>
        </div>
      </div>
      <UVIndex data={data.result} />
    </div>
  );
}
