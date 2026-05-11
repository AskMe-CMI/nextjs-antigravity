"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import Navbar from "../components/Navbar";

const Spreadsheet = dynamic(() => import("../components/Spreadsheet"), {
    ssr: false,
    loading: () => <p className="p-4 text-[var(--muted)]">Loading spreadsheet...</p>,
});

export default function OperationLE() {
    const options = useMemo(() => {
        const data = [
            ["ACROBAT-ITSC", "2,340.00", "2,340.00", "2,340.00", "2,340.00", "2,340.00", "2,340.00", "2,340.00", "2,340.00", "2,916.67", "2,916.67", "2,916.67", "2,916.67"],
            ["Adobe-Acrobat", "57,506.66", "57,506.66", "57,506.66", "57,506.66", "57,506.66", "57,506.66", "57,506.74", "", "", "", "", ""],
            ["Adobe-Dream", "1,494.16", "1,494.16", "1,494.16", "1,494.16", "1,494.16", "1,494.16", "1,494.24", "", "", "", "", ""],
            ["Adobe-ILLUS", "3,060.82", "3,060.82", "3,060.82", "3,060.82", "3,060.82", "3,060.82", "3,060.98", "", "", "", "", ""],
            ["Adobe-Photoshop", "2,988.33", "2,988.33", "2,988.33", "2,988.33", "2,988.33", "2,988.33", "2,988.37", "", "", "", "", ""],
            ["Adobe-PREMIER", "4,482.50", "4,482.50", "4,482.50", "4,482.50", "4,482.50", "4,482.50", "4,482.50", "", "", "", "", ""],
            ["ASKME", "2,916.67", "2,916.67", "2,916.67", "2,916.67", "2,916.67", "2,916.67", "2,916.67", "2,916.67", "2,916.67", "2,916.67", "2,916.67", "2,916.67"],
            ["CLOUD FLARE", "3,900.00", "3,900.00", "3,900.00", "3,900.00", "3,900.00", "3,900.00", "3,900.00", "3,900.00", "3,900.00", "3,900.00", "3,900.00", "3,900.00"],
            ["CLOUD HM", "83.33", "83.33", "83.33", "83.33", "83.33", "", "", "", "", "", "", ""],
            ["CLOUD SHARE", "3,500.00", "3,500.00", "3,500.00", "3,500.00", "3,500.00", "3,500.00", "3,500.00", "3,500.00", "3,500.00", "3,500.00", "3,500.00", "3,500.00"],
            ["COMET", "", "", "", "(31,837.95)", "", "", "(31,166.22)", "", "", "", "", ""],
            ["CS LOX Renew Firewall", "7,958.33", "7,958.33", "7,958.33", "7,958.33", "7,958.33", "7,958.33", "7,958.33", "7,958.35", "7,958.33", "7,958.33", "7,958.33", "7,958.33"],
            ["CS LOX INFO DomainName", "", "1,000.00", "", "", "", "", "", "", "", "", "", ""],
            ["DOCUWARE", "297,333.33", "297,333.37", "343,200.00", "343,200.00", "405,699.98", "343,200.00", "343,200.00", "343,200.00", "405,699.98", "405,699.98", "405,699.98", "405,699.98"],
            ["DS-IT", "", "343,488.09", "701,835.92", "210,281.54", "207,733.62", "195,104.67", "207,947.28", "207,064.49", "217,498.00", "217,498.00", "217,498.00", "217,498.00"],
            ["FIRST ONE MA CISCO", "", "16,625.00", "16,625.00", "16,625.00", "16,625.00", "16,625.00", "16,625.00", "16,625.00", "16,625.00", "16,625.00", "16,625.00", "16,625.00"],
            ["FUJI", "", "", "23,400.00", "6,597.36", "", "", "", "", "", "", "", ""],
            ["HM-VM", "44,400.00", "44,400.00", "44,400.00", "44,400.00", "44,400.00", "44,483.33", "44,483.33", "44,483.33", "44,400.00", "44,400.00", "44,400.00", "44,400.00"],
            ["INTERNET", "43,500.00", "43,500.00", "43,500.00", "43,500.00", "43,500.00", "43,500.00", "43,500.00", "43,500.00", "43,500.00", "43,500.00", "43,500.00", "43,500.00"],
            ["IQVIA-LICENSE", "113,248.80", "108,419.58", "109,448.78", "107,778.82", "108,336.58", "105,401.16", "107,638.12", "105,421.50", "108,336.58", "108,336.58", "108,336.58", "108,336.58"],
            ["Grand Total", "693,561.78", "1,061,169.85", "1,476,291.04", "1,118,626.68", "981,914.13", "1,019,286.10", "882,549.59", "839,795.93", "914,945.01", "1,099,433.13", "914,945.01", "914,945.01"],
            ["", "", "", "", "", "", "", "", "", "28,750.00", "28,750.00", "28,750.00", "28,750.00"], // Empty spacer with Dec-Mar values?
            ["ONE PAYMENT", "", "", "", "", "", "", "", "", "10,000.00", "10,000.00", "10,000.00", "10,000.00"],
            ["FIRST ONE MA YEEM", "", "", "", "", "", "57,500.00", "28,750.00", "", "28,750.00", "28,750.00", "28,750.00", "28,750.00"],
            ["KG-AIR", "", "", "", "", "", "38,333.31", "9,583.33", "", "9,583.33", "9,583.33", "9,583.33", "9,583.33"],
            ["KG-MONITOR", "", "", "", "", "", "11,000.00", "2,750.00", "", "2,750.00", "2,750.00", "2,750.00", "2,750.00"],
            ["KMIT-FIREWALL", "", "", "", "", "", "2,083.33", "2,083.33", "", "2,083.33", "2,083.33", "2,083.33", "2,083.33"],
            ["KMIT BACKUP", "", "", "", "", "", "2,500.00", "2,500.00", "", "2,500.00", "2,500.00", "2,500.00", "2,500.00"],
            ["MADQUWARE", "", "", "", "", "", "20,833.33", "20,833.33", "", "20,833.33", "20,833.33", "20,833.33", "20,833.33"],
            ["", "", "", "", "", "", "", "", "", "", "", "", ""], // Empty Spacer
            ["Spare (Line OA,Training)", "", "", "", "", "", "", "", "", "150,000", "150,000", "150,000", "200,000"],
            ["Other new system(Ticket Management)", "", "", "", "", "", "", "", "", "50,000", "50,000", "50,000", "50,000"],
            ["Subscription cost (concur)", "", "", "", "", "", "", "", "", "90,000", "90,000", "90,000", "90,000"],
            ["", "693,561.78", "693,561.78", "693,561.78", "693,561.78", "693,561.78", "1,052,693.41", "1,014,799.56", "906,295.92", "991,445.00", "1,175,933.12", "991,445.00", "991,445.00"]
        ];

        return {
            worksheets: [{
                data,
                columns: [
                    { type: "text", title: "Row Labels", width: 250 },
                    { type: "numeric", title: "Apr", width: 100, mask: "#,##0.00" },
                    { type: "numeric", title: "May", width: 100, mask: "#,##0.00" },
                    { type: "numeric", title: "Jun", width: 100, mask: "#,##0.00" },
                    { type: "numeric", title: "Jul", width: 100, mask: "#,##0.00" },
                    { type: "numeric", title: "Aug", width: 100, mask: "#,##0.00" },
                    { type: "numeric", title: "Sep", width: 100, mask: "#,##0.00" },
                    { type: "numeric", title: "Oct", width: 100, mask: "#,##0.00" },
                    { type: "numeric", title: "Nov", width: 100, mask: "#,##0.00" },
                    { type: "numeric", title: "Dec", width: 100, mask: "#,##0.00" },
                    { type: "numeric", title: "Jan", width: 100, mask: "#,##0.00" },
                    { type: "numeric", title: "Feb", width: 100, mask: "#,##0.00" },
                    { type: "numeric", title: "Mar", width: 100, mask: "#,##0.00" },
                ],
                nestedHeaders: [
                    [
                        { title: '', colspan: 1 },
                        { title: '', colspan: 5 },
                        { title: 'Oct-LE 2025', colspan: 7 },
                    ]
                ],
                tableOverflow: true,
                tableWidth: "100%",
                minDimensions: [13, 22],
            }],
            onload: function (spreadsheet: any) {
                // Set Header Font Size
                if (spreadsheet && spreadsheet.el) {
                    spreadsheet.el.style.fontSize = '12px';
                    spreadsheet.el.style.fontFamily = 'Inter, sans-serif';
                }

                // Define Colors
                const COL_COLORS = {
                    ROW_LABELS: '#EFEFEF', // Light Gray
                    APR_AUG: '#CFE2F3', // Light Blue
                    JUL_AUG: '#fbe2d5', // Light orange
                    SEP_NOV: '#EAD1DC', // Light Purple/Pink
                    DEC_MAR: '#D9EAD3', // Light Green
                    GRAND_TOTAL: '#e97132', // Orange
                    PINK_SECTION: '#EAD1DC', // Pinkish
                    DS_IT_PREFIX: '#D9D9D9' // Grayish for some specific label backgrounds if needed
                };

                // Helper to set color
                const setBg = (cell: string, color: string) => {
                    spreadsheet.worksheets[0].setStyle(cell, 'background-color', color);
                }

                const json = spreadsheet.worksheets[0].getData();

                // 1. Color Columns (Data Cells)
                // @ts-ignore
                json.forEach((row, rowIndex) => {
                    const columns = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];

                    // Grand Total Row (Orange)
                    if (row[0] === "Grand Total") {
                        columns.forEach(col => {
                            setBg(`${col}${rowIndex + 1}`, COL_COLORS.GRAND_TOTAL);
                            spreadsheet.worksheets[0].setStyle(`${col}${rowIndex + 1}`, 'font-weight', 'bold');
                            // Add top border to grand total
                            spreadsheet.worksheets[0].setStyle(`${col}${rowIndex + 1}`, 'border-top', '2px solid #000');
                        });
                        return; // Skip other coloring for this row
                    }

                    // Pink Section Rows (Below Grand Total)
                    const pinkRows = ["ONE PAYMENT", "FIRST ONE MA YEEM", "KG-AIR", "KG-MONITOR", "KMIT-FIREWALL", "KMIT BACKUP", "MADQUWARE"];

                    // Standard Rows
                    columns.forEach((col, colIndex) => {
                        const cell = `${col}${rowIndex + 1}`;

                        // Apply Column Colors
                        // A (0): Row Labels
                        // B-F (1-5): Apr-Aug -> Blue (Corrected to indices 1-3 based on user Step 912 edits?)
                        // Wait, I should respect user's manual edits from Step 912 if possible.
                        // Step 912 edits: 
                        // else if (colIndex >= 1 && colIndex <= 3) setBg(cell, COL_COLORS.APR_AUG);
                        // else if (colIndex >= 4 && colIndex <= 5) setBg(cell, COL_COLORS.JUL_AUG);
                        // else if (colIndex >= 6 && colIndex <= 8) setBg(cell, COL_COLORS.SEP_NOV);
                        // else if (colIndex >= 9 && colIndex <= 12) setBg(cell, COL_COLORS.DEC_MAR);

                        if (colIndex === 0) {
                            if (pinkRows.includes(row[0])) setBg(cell, COL_COLORS.PINK_SECTION);
                            else setBg(cell, COL_COLORS.ROW_LABELS);
                        }
                        else if (colIndex >= 1 && colIndex <= 3) setBg(cell, COL_COLORS.APR_AUG);
                        else if (colIndex >= 4 && colIndex <= 5) setBg(cell, COL_COLORS.JUL_AUG);
                        else if (colIndex >= 6 && colIndex <= 8) setBg(cell, COL_COLORS.SEP_NOV);
                        else if (colIndex >= 9 && colIndex <= 12) setBg(cell, COL_COLORS.DEC_MAR);
                    });

                    // Specific Row Overrides (Mocking the visual highlights)
                    if (row[0] === 'DS-IT') {
                        spreadsheet.worksheets[0].setStyle(`A${rowIndex + 1}`, 'font-weight', 'bold');
                    }
                });

                // 2. Color Headers
                // Direct DOM manipulation because Jspreadsheet CE header styling is limited in options
                if (spreadsheet && spreadsheet.el) {
                    const headers = spreadsheet.el.querySelectorAll('thead td');
                    headers.forEach((header: HTMLElement, index: number) => {
                        const text = header.innerText;

                        // Default header color
                        header.style.backgroundColor = '#f0f0f0';
                        header.style.textAlign = 'center';
                        header.style.fontWeight = 'bold';

                        if (['Row Labels'].includes(text)) header.style.backgroundColor = COL_COLORS.ROW_LABELS;
                        if (['Apr', 'May', 'Jun', 'Jul', 'Aug'].includes(text)) header.style.backgroundColor = COL_COLORS.APR_AUG;
                        if (['Sep', 'Oct', 'Nov'].includes(text)) header.style.backgroundColor = COL_COLORS.SEP_NOV;
                        if (['Dec', 'Jan', 'Feb', 'Mar'].includes(text)) header.style.backgroundColor = COL_COLORS.DEC_MAR;

                        // Nested Header "Oct-LE 2025" (Dec-Mar group) styling
                        if (text === 'Oct-LE 2025') {
                            header.style.backgroundColor = '#93C47D'; // Darker Green for group header
                            header.style.color = 'white';
                        }
                    });
                }
            }
        };
    }, []);

    return (
        <div className="min-h-screen bg-[var(--background)] flex flex-col">
            <Navbar />
            <main className="flex-grow p-4 md:p-8">
                <header className="mb-6 flex justify-between items-center">
                    <h1 className="text-2xl md:text-3xl font-serif font-bold text-[var(--foreground)]">
                        Operation LE
                    </h1>
                </header>

                <div className="bg-white rounded-xl shadow-sm border border-[var(--border)] overflow-hidden p-2">
                    <div className="mb-2 font-bold text-sm">Sum of Amount in local currency Column Labels</div>
                    <Spreadsheet options={options} />
                </div>
            </main>
        </div>
    );
}
