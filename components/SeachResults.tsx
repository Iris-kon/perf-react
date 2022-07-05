import { useMemo } from "react"
import { ProductItem } from "./ProductItem"

interface SearchResultsProps {
    results : Array<{
        id: number
        title: string
        price: number
        formatedPrice: string
    }>
    totalPrice: number;
    onAddToWishlist: (id: number) => void
}

export function SearchResults({results, onAddToWishlist, totalPrice}: SearchResultsProps) {
    return (
        <div>
            <h2>{totalPrice}</h2>
            {
                results.map(product => {
                    return (
                        <ProductItem 
                            key={product.id} 
                            product={product} 
                            onAddToWishlist={onAddToWishlist}
                        />
                    )
                })
            }
        </div>
    )
}

/**
 * when to use useMemo
 * 
 * 1. heavy calculations
 * 2. Referencial Equality (when repassing data  to children components)
 * 
 * when to use useCallback 
 * 
 * 1.  Refenencial Equality (when doing prop driling)
 */