import React from "react";
import styled from "styled-components";


const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin: 8px 0;
    color: #cfcfcf;

    th, td {
        border: 1px solid #cfcfcf;
        padding: 8px;
        text-align: left;
    }

    th {
        background-color: #636363;
    }
`;

const List = styled.div`
    width: 100%;
    line-height: 1.6;
`;

const formatText = (text: string) => {
    return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
};

export const renderMessage = (text: string) => {
    const formattedText = formatText(text);

    if (formattedText.includes("```")) {
        return renderCodeBlocks(formattedText);
    }

    if (formattedText.includes("|")) {
        return renderTable(formattedText);
    }
    if (formattedText.includes("*") || formattedText.includes("-")) {
        return renderLists(formattedText);
    }
    return renderText(formattedText);
};

const renderCodeBlocks = (text: string) => {
    const parts = text.split("```");
    return (
        <div>
            {parts.map((part, index) =>
                    index % 2 === 1 ? (
                        <pre key={index} style={{ backgroundColor: "#656565", padding: "10px", borderRadius: "10px" }}>
            <code>{part.trim()}</code>
          </pre>
                    ) : (
                        <span key={index} dangerouslySetInnerHTML={{ __html: part }} />
                    )
            )}
        </div>
    );
};

const renderTable = (text: string) => {
    const lines = text.split("\n").filter((line) => line.trim() !== "");

    let tableStartIndex = -1;
    let headerLineIndex = -1;

    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes("|---")) {
            tableStartIndex = i;
            if (i > 0 && lines[i - 1].includes("|")) {
                headerLineIndex = i - 1;
            }
        } else if (lines[i].includes("|") && headerLineIndex === -1 && tableStartIndex === -1) {
            headerLineIndex = i;
        }
    }

    if (tableStartIndex >= 0 || headerLineIndex >= 0) {
        let tableEndIndex = -1;
        if(tableStartIndex > -1){
            for (let i = tableStartIndex + 1; i < lines.length; i++) {
                if (!lines[i].includes("|") && !lines[i].includes("---")) {
                    tableEndIndex = i;
                    break;
                }
            }
            if (tableEndIndex === -1) {
                tableEndIndex = lines.length;
            }
        } else {
            for (let i = headerLineIndex + 1; i < lines.length; i++) {
                if (!lines[i].includes("|") && !lines[i].includes("---")) {
                    tableEndIndex = i;
                    break;
                }
            }
            if (tableEndIndex === -1) {
                tableEndIndex = lines.length;
            }
        }

        let beforeTable = "";
        let tableLines = [];

        if(tableStartIndex > -1){
            beforeTable = lines.slice(0, headerLineIndex > -1 ? headerLineIndex : tableStartIndex).join("\n");
            tableLines = lines.slice(headerLineIndex > -1 ? headerLineIndex : tableStartIndex, tableEndIndex);
        } else {
            beforeTable = lines.slice(0, headerLineIndex).join("\n");
            tableLines = lines.slice(headerLineIndex, tableEndIndex);
        }

        const headers = tableLines[0].split("|").filter((header) => header.trim() !== "");

        const rows = [];
        let startRowIndex = 1;
        if(tableStartIndex > -1 && headerLineIndex > -1){
            startRowIndex = 2;
        }

        for (let i = startRowIndex; i < tableLines.length; i++) {
            const row = tableLines[i].split("|").filter(c => c.trim() !== "");
            rows.push(row);
        }

        const afterTableContent = lines.slice(tableEndIndex).join("\n");

        return (
            <div>
                {beforeTable && (
                    <div style={{ fontWeight: "bold", marginBottom: "10px" }} dangerouslySetInnerHTML={{ __html: beforeTable.replace(/\n/g, "<br>") }} />
                )}

                <Table>
                    <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index} dangerouslySetInnerHTML={{ __html: header.trim() }} />
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex} dangerouslySetInnerHTML={{ __html: cell.trim() }} />
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </Table>

                {afterTableContent && (
                    <div dangerouslySetInnerHTML={{ __html: afterTableContent.replace(/\n/g, "<br>") }} />
                )}
            </div>
        );
    }

    return renderText(text);
};

const renderLists = (text: string) => {
    const lines = text.split("\n").filter((line) => line.trim() !== "");
    return (
        <List>
            {lines.map((line, index) => {
                if (line.trim().startsWith("* ") || line.trim().startsWith("- ")) {
                    return (
                        <ul key={index} style={{ listStyleType: "disc", marginLeft: "20px", paddingLeft: "10px" }}>
                            <li dangerouslySetInnerHTML={{ __html: line.trim().substring(2) }} />
                        </ul>
                    );
                }
                return <div key={index} dangerouslySetInnerHTML={{ __html: line }} />;
            })}
        </List>
    );
};

const renderText = (text: string) => {
    return <div dangerouslySetInnerHTML={{ __html: text }} />;
};