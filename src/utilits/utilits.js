export const windRose = (degr) => {
    switch (true) {
        case  (degr > 22.5 && degr < 67.5): return 'NE'
        case  (degr > 67.5 && degr<112.5): return 'E'
        case  (degr > 112.5 && degr<157.5): return 'SE'
        case  (degr > 157.5  && degr< 202.5) : return 'S'
        case  (degr > 202.5  && degr< 247.5) : return 'SW'
        case ( degr > 247.5  && degr< 292.5 ): return 'W'
        case  (degr > 292.5  && degr< 337.5 ): return 'NW'
        default: return 'N'
    }

}
