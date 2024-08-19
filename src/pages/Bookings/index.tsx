/* eslint-disable */
import cn from "classnames";
import { useState, ChangeEvent } from "react";
import { BOOKINGS_TABS } from "../../constants/bookings";
import SearchComponent from "../../components/SearchComponent";
import { ReactComponent as SearchIcon } from "../../icons/SearchIcon.svg";
import styles from "./index.module.scss";

const BookingsTabs = () => {
  return (
    <div className={styles.tabsContainer}>
      {BOOKINGS_TABS?.map((item) => (
        <button className={cn(styles.tab, { [styles.selected]: false })}>
          {item.name}
        </button>
      ))}
    </div>
  );
};

const Bookings = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  return (
    <div className={cn("container", styles.container)}>
      <div className={styles.headingContainer}>
        <div className={styles.heading}>Bookings</div>
        <div className={styles.text}>
          Create and manage your bookings from here
        </div>
      </div>
      <div className={styles.mainContainer}>
        <BookingsTabs />
        <div className={styles.searchContainer}>
          <div className={styles.search}>
            <SearchComponent
              value={searchTerm}
              onChange={searchHandler}
              LeadingIcon={SearchIcon}
              placeholder={
                "Search by name, number, duty type, city or booking id"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
