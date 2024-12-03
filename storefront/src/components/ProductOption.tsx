"use client"
import React from "react"

export function SmallOption({ product }): React.JSX.Element {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ marginRight: 20 }}>
        <img
          src={product.thumbnail}
          alt={product.title}
          style={{ width: "25px", height: "25px", objectFit: "cover" }}
        />
      </div>
      <div style={{ flex: 1 }}>
        <div>{`${product.title}`}</div>
      </div>
    </div>
  )
}

export function ProductOption({ product }): React.JSX.Element {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ marginRight: 20 }}>
        <img
          src={product.thumbnail}
          alt={product.title}
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
        />
      </div>
      <div style={{ flex: 1 }}>
        <div>{`${product.title}`}</div>
        <div>
          <small>SKUs: {product.variants.map((x) => x.sku).join(", ")}</small>
        </div>
      </div>
    </div>
  )
}
