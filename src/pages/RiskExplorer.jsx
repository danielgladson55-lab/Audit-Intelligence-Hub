import riskLibrary from "../data/riskLibrary";
import { getRiskDetails }
from "../services/riskEngine";

export default function RiskExplorer() {

  return (
    <div>

      <h1>
        Risk Explorer
      </h1>

      {
        riskLibrary.map(risk => {

          const details =
            getRiskDetails(
              risk.riskId
            );

          return (
            <div
              key={risk.riskId}
              style={{
                border:
                  "1px solid #ddd",
                marginBottom:
                  "20px",
                padding: "20px",
                borderRadius:
                  "10px"
              }}
            >

              <h2>
                {risk.title}
              </h2>

              <p>
                Impact:
                {" "}
                {risk.impact}
              </p>

              <p>
                Likelihood:
                {" "}
                {risk.likelihood}
              </p>

              <h3>
                Controls
              </h3>

              <ul>
                {
                  details.controls.map(
                    control => (
                      <li
                        key={
                          control.controlId
                        }
                      >
                        {
                          control.controlName
                        }
                      </li>
                    )
                  )
                }
              </ul>

            </div>
          );
        })
      }

    </div>
  );
}