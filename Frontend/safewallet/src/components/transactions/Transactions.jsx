import { useEffect, useState } from "react";
import style from "./transactions.module.css";
import { getTransactions } from "../../api/getTransactions";

function Transactions(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    getTransactions(props.userId).then((response) => {
      let orden = response.data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setData(orden);
    });
  }, []);

  return (
    <div className={style.transactionMainContainer}>
      <div>
        <h2 className="titles">Tu última actividad</h2>
      </div>
      {data.length === 0 ? (
        <div className={style.transactionsBackground}>
          <h3 className={style.noTransactions}>
            Parece que aún no has realizado ninguna transacción...🔎
          </h3>
        </div>
      ) : (
        <>
          {data.map((transaction) => (
            <div key={transaction.id} className={style.transactionsBackground}>
              <div className={style.transactionContainer}>
                <img
                  src="/safewallet-transaction.svg"
                  alt="safewallet transaction"
                  className={style.safewalletTransaction}
                />
                <div className={style.columnW}>
                  <h5>Nombre</h5>
                  <p>{transaction.from}</p>
                </div>
                <div className={style.columnW}>
                  <h5>Monto</h5>
                  {transaction.amount > 0 ? (
                    <p style={{ color: "green", fontWeight: "bold" }}>
                      $ {transaction.amount}
                    </p>
                  ) : (
                    <p style={{ color: "red", fontWeight: "bold" }}>
                      $ {transaction.amount}
                    </p>
                  )}
                </div>
                <div className={style.columnW}>
                  <h5>Fecha</h5>
                  <p>
                    {
                      (transaction.date = new Date(
                        transaction.date
                      ).toLocaleDateString("en-US"))
                    }
                  </p>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Transactions;
