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

export const renderMessage = (text: string) => {
    if (text.includes("```")) {
        const parts = text.split("```");
        return (
            <div>
                {parts.map((part, index) => {
                    if (index % 2 === 1) {
                        return (
                            <pre key={index} style={{ backgroundColor: "#656565", padding: "10px", borderRadius: "10px" }}>
                                <code>{part.trim()}</code>
                            </pre>
                        );
                    } else {
                        return <span key={index}>{part}</span>;
                    }
                })}
            </div>
        );
    }

    if (text.includes("|")) {
        const lines = text.split("\n").filter((line) => line.trim() !== "");
        if (lines.length > 1 && lines[1].includes("---")) {
            const headers = lines[0].split("|").filter((header) => header.trim() !== "");
            const rows = lines.slice(2).map((row) => row.split("|").filter((cell) => cell.trim() !== ""));

            return (
                <Table>
                    <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index}>{header.trim()}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex}>{cell.trim()}</td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </Table>
            );
        }
    }

    return renderLists(text);
};

const renderLists = (text: string) => {
    const lines = text.split("\n").filter((line) => line.trim() !== "");

    return (
        <List>
            {lines.map((line, index) => {
                if (line.trim().startsWith("* ") || line.trim().startsWith("- ")) {
                    return (
                        <ul key={index} style={{ listStyleType: "disc", marginLeft: "20px", paddingLeft: "10px" }}>
                            <li style={{ marginBottom: "8px" }}>{line.trim().substring(2)}</li>
                        </ul>
                    );
                } else if (line.trim().startsWith("**") && line.trim().endsWith("**")) {
                    return (
                        <div key={index} style={{ fontWeight: "bold", fontSize: "1.2em", margin: "16px 0 8px 0" }}>
                            {line.trim().slice(2, -2)}
                        </div>
                    );
                } else {
                    return (
                        <div key={index}>
                            {line}
                        </div>
                    );
                }
            })}
        </List>
    );
};