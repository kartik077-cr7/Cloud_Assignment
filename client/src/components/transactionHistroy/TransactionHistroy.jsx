import React, { useState, useEffect } from "react";
import _ from "lodash";
import moment from "moment";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Button from "@mui/material/Button";
import { getTransaction } from "../../services/Transaction";
import styles from "./TransactionHistroy.module.scss";

const columns = [
    {
        id: "amount",
        label: "Amount",
        minWidth: 50
    },
    {
        id: "date",
        label: "Date",
        minWidth: 75,
        format: (value) => moment(value).format("MM/DD/YYYY")
    },
    { id: "category", label: "Category", minWidth: 50 },
    { id: "stmt", label: "Remark", minWidth: 100 }
];

const categoryOptions = [
    { value: undefined, label: "No filter" },
    { value: "Food", label: "Food" },
    { value: "Travel", label: "Travel" },
    { value: "Shopping", label: "Shopping" },
    { value: "Utility Bill", label: "Utility Bill" },
    { value: "Recharge", label: "Recharge" },
    { value: "Income", label: "Income" },
    { value: "Fee", label: "Fee" },
    { value: "EMI", label: "EMI" },
    { value: "Others", label: "Others" }
];
//width:615, height:330
export function TranactionHistroy({ width = null, height = null }) {
    const [page, setPage] = useState(0);
    const [sortCol, setSortCol] = useState("date");
    const [sortDir, setSortDir] = useState("desc");
    const [transactions, setTransactions] = useState([]);
    const [amountLessThanFilter, setAmountLessThanFilter] = useState(undefined);
    const [amountMoreThanFilter, setAmountMoreThanFilter] = useState(undefined);
    const [startDateFilter, setStartDateFilter] = useState(undefined);
    const [endDateFilter, setEndDateFilter] = useState(undefined);
    const [categoryFilter, setCategoryFilter] = useState(undefined);

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = () => {
        getTransaction().then(({ status, data }) => {
            if (status === 200) {
                const allTransactions = Object.keys(data).map((key) => { return { id: key, ...data[key] } });
                setTransactions(_.orderBy(allTransactions, ["date"], ["desc"]));
            }
            else {
                return [];
            }
        });
    }




    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleSort = (col) => {
        setSortCol(col);
        setSortDir(sortDir === "desc" ? "asc" : "desc");
    };

    useEffect(() => {
        setTransactions(_.orderBy(transactions, [sortCol], [sortDir]));
    }, [sortCol, sortDir]);

    const handleFilter = () => {
        let filteredTransactions = transactions;
        if (amountLessThanFilter) {
            filteredTransactions = _.filter(
                filteredTransactions,
                (transaction) => {
                    if (transaction.amount < amountLessThanFilter)
                        return transaction;
                }
            );
        }
        if (amountMoreThanFilter) {
            filteredTransactions = _.filter(
                filteredTransactions,
                (transaction) => {
                    if (transaction.amount > amountMoreThanFilter)
                        return transaction;
                }
            );
        }

        if (categoryFilter) {
            filteredTransactions = _.filter(
                filteredTransactions,
                (transaction) => {
                    if (
                        transaction.category.toLowerCase() ===
                        categoryFilter.toLowerCase()
                    )
                        return transaction;
                }
            );
        }
        if (startDateFilter) {
            filteredTransactions = _.filter(
                filteredTransactions,
                (transaction) => {
                    if (moment(transaction.date).isSameOrAfter(startDateFilter))
                        return transaction;
                }
            );
        }
        if (endDateFilter) {
            filteredTransactions = _.filter(
                filteredTransactions,
                (transaction) => {
                    if (moment(transaction.date).isSameOrBefore(endDateFilter))
                        return transaction;
                }
            );
        }
        setTransactions(filteredTransactions);
    };

    const handleReset = () => {
        setAmountLessThanFilter(undefined);
        setAmountMoreThanFilter(undefined);
        setCategoryFilter(undefined);
        setStartDateFilter(undefined);
        setEndDateFilter(undefined);
        fetchTransactions();
    };

    return (
        <>
            <div className={styles.filtersDiv}>
                <TextField
                    label="Amount less than"
                    type="number"
                    InputLabelProps={{
                        shrink: true
                    }}
                    value={amountLessThanFilter}
                    variant="filled"
                    onChange={(e) => setAmountLessThanFilter(e.target.value)}
                />
                <TextField
                    label="Amount More than"
                    type="number"
                    value={amountMoreThanFilter}
                    InputLabelProps={{
                        shrink: true
                    }}
                    variant="filled"
                    onChange={(e) => setAmountMoreThanFilter(e.target.value)}
                />

                <TextField
                    id="date"
                    label="From"
                    type="date"
                    variant="filled"
                    value={startDateFilter}
                    sx={{ width: 220 }}
                    InputLabelProps={{
                        shrink: true
                    }}
                    onChange={(e) => setStartDateFilter(e.target.value)}
                />
                <TextField
                    id="date"
                    label="To"
                    type="date"
                    variant="filled"
                    value={endDateFilter}
                    sx={{ width: 220 }}
                    InputLabelProps={{
                        shrink: true
                    }}
                    onChange={(e) => setEndDateFilter(e.target.value)}
                />

                <TextField
                    id="filled-select"
                    select
                    label="Category"
                    value={categoryFilter}
                    onChange={(e) => {
                        setCategoryFilter(e.target.value);
                    }}
                    variant="filled"
                    style={{ width: "200px" }}
                >
                    {categoryOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>

                <Button variant="outlined" onClick={handleReset}>
                    Reset
                </Button>
                <Button
                    variant="outlined"
                    onClick={handleFilter}
                    startIcon={<FilterAltIcon />}
                >
                    Filter
                </Button>
            </div>
            <Paper sx={{ width: width ? `${width}px` : "100%" }}>
                {transactions.length > 0 ? (
                    <TableContainer
                        sx={{ height: height ? `${height}px` : "100%" }}
                    >
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            onClick={() => {
                                                handleSort(column.id);
                                            }}
                                            style={{
                                                minWidth: column.minWidth,
                                                color: "white",
                                                backgroundColor: "#007fff",
                                                cursor: "pointer"
                                            }}
                                        >
                                            {column.label}
                                            {sortCol === column.id &&
                                                (sortDir === "desc" ? (
                                                    <ArrowDropDownIcon />
                                                ) : (
                                                    <ArrowDropUpIcon />
                                                ))}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {transactions
                                    .slice(
                                        page * 5,
                                        page * 5 + 5
                                    )
                                    .map((transaction) => {
                                        return (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={transaction.id}
                                            >
                                                {columns.map((column) => {
                                                    const value =
                                                        transaction[column.id];
                                                    if (column.id === "amount") {
                                                        const transactionType =
                                                            transaction["type"] ===
                                                                "debit"
                                                                ? true
                                                                : false;
                                                        return (
                                                            <TableCell
                                                                key={column.id}
                                                                style={{
                                                                    color: transactionType
                                                                        ? "green"
                                                                        : "red"
                                                                }}
                                                            >
                                                                {`${transactionType
                                                                    ? "+ ₹"
                                                                    : "- ₹"
                                                                    } ${value}`}
                                                            </TableCell>
                                                        );
                                                    } else {
                                                        return (
                                                            <TableCell
                                                                key={column.id}
                                                            >
                                                                {column.format
                                                                    ? column.format(
                                                                        value
                                                                    )
                                                                    : value}
                                                            </TableCell>
                                                        );
                                                    }
                                                })}
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>) : (<div>No Transactions</div>)}
                <TablePagination
                    component="div"
                    rowsPerPageOptions={[5]}
                    count={transactions.length}
                    rowsPerPage={5}
                    page={page}
                    onPageChange={handleChangePage}
                />
            </Paper>
        </>
    );
}
