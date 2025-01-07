/* eslint-disable */
import styles from "./index.module.scss";

export default function Preview() {
  return (
    <div className={styles.invoice}>
      <div className={styles.header}>
        <h1>GreenGrass</h1>
        <p>
          Park avenue, Mumbai, Maharashtra | Email: osow0e496@hellomailco.net |
          Phone: 8899650421
        </p>
      </div>

      <div className={styles.invoiceDetails}>
        <div className={styles.left}>
          <p>Walk-in edited</p>
        </div>
        <div className={styles.right}>
          <p>*Original for recipient</p>
          <p>Invoice Number: GR2425-000002</p>
          <p>Invoice Date: 21-07-2024</p>
        </div>
      </div>

      <table className={styles.invoiceTable}>
        <thead>
          <tr>
            <th>SR.</th>
            <th>DESCRIPTION</th>
            <th>RATE</th>
            <th>QTY</th>
            <th>AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>
              <p>
                #20003472 (Booked by: edited) | From 19-07-2024 to 20-07-2024
              </p>
              <p>Vehicle Number: MH551234</p>
              <p>City: Mumbai - Ahmedabad</p>
              <p>Passengers: edited and edited</p>
              <p>set done</p>
              <p className={styles.vehicle}>BH 80DMs</p>
              <p className={styles.model}>Toyota Innova</p>
            </td>
            <td>3,000.00</td>
            <td>1</td>
            <td>3,000.00</td>
          </tr>
          <tr>
            <td></td>
            <td>
              <p className={styles.vehicle}>BH 80DMs</p>
              <p className={styles.model}>Toyota Innova</p>
            </td>
            <td>2,000.00</td>
            <td>1</td>
            <td>2,000.00</td>
          </tr>
          <tr>
            <td></td>
            <td>Extra Km</td>
            <td>10.00</td>
            <td>20 Km</td>
            <td>200.00</td>
          </tr>
          <tr>
            <td></td>
            <td>Extra Hours</td>
            <td>10.00</td>
            <td>00:45 hr</td>
            <td>7.50</td>
          </tr>
          <tr>
            <td>2</td>
            <td>
              <p>#66683204 (Booked by: edited) | Date: 14-02-2025</p>
              <p>Vehicle Group: DzireAmaze/Etios | MH511234</p>
              <p>Duty Type: 500KM per day (Mumbai - Agartala)</p>
              <p>Passengers: edited</p>
              <div className={styles.allowances}>
                <p>Driver daily allowance</p>
                <p>Early start allowance</p>
                <p>Extra duty allowance</p>
                <p>Night allowance</p>
                <p>Outstation allowance</p>
                <p>Outstation overnight allowance</p>
                <p>Over time</p>
                <p>Sunday allowance</p>
              </div>
            </td>
            <td>2,000.00</td>
            <td>1</td>
            <td>2,000.00</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Charges</td>
            <td>10,000.00</td>
            <td>1</td>
            <td>10,000.00</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Charges [edited]</td>
            <td>100.00</td>
            <td>1</td>
            <td>100.00</td>
          </tr>
        </tbody>
      </table>

      <div className={styles.totals}>
        <div className={styles.totalRow}>
          <span>Taxable Sub Total</span>
          <span>17,215.50</span>
        </div>
        <div className={styles.totalRow}>
          <span>CGST 2.5% - 2.5%</span>
          <span>430.39</span>
        </div>
        <div className={styles.totalRow}>
          <span>Non-Taxable Sub Total</span>
          <span>100.00</span>
        </div>
        <div className={styles.totalRow}>
          <span>Round Off</span>
          <span>0.11</span>
        </div>
        <div className={`${styles.totalRow} ${styles.final}`}>
          <span>TOTAL</span>
          <span>₹ 17,746.00</span>
        </div>
      </div>

      <div className={styles.footer}>
        <p className={styles.amountWords}>
          In words: Seventeen Thousand Seven Hundred And Forty Six Rupees Only
        </p>
        <p className={styles.note}>
          This is a computer generated invoice with no need for signature.
        </p>
      </div>
    </div>
  );
}
