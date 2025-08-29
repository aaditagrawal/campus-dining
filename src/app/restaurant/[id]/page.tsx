'use client';

import { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { getRestaurantById, getMenuCategoriesByRestaurantId } from '@/lib/dataLoader';
import { CuisineType, isRestaurantOpen } from '@/lib/types';
import { ArrowLeft, Clock, MapPin, Phone, Truck, Download, Search, Grid3X3, List, SlidersHorizontal } from 'lucide-react';

export default function RestaurantPage() {
  const params = useParams();
  const restaurantId = params.id as string;

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<CuisineType[]>([]);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState<'name' | 'price-low' | 'price-high'>('name');
  const [viewMode, setViewMode] = useState<'tile' | 'list'>('tile');

  const restaurant = getRestaurantById(restaurantId);
  const menuCategories = getMenuCategoriesByRestaurantId(restaurantId);

  const filteredMenuItems = useMemo(() => {
    const allItems = menuCategories.flatMap(category => category.items);

    return allItems.filter(item => {
      // Search filter
      if (searchTerm && !item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !item.description?.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !item.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))) {
        return false;
      }

      // Type filter
      if (selectedTypes.length > 0) {
        const hasSelectedType = item.variations.some(variation =>
          selectedTypes.includes(variation.type)
        );
        if (!hasSelectedType) return false;
      }

      // Price filter
      const hasValidPrice = item.variations.some(variation =>
        variation.price >= priceRange[0] && variation.price <= priceRange[1]
      );
      if (!hasValidPrice) return false;

      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return Math.min(...a.variations.map(v => v.price)) - Math.min(...b.variations.map(v => v.price));
        case 'price-high':
          return Math.max(...b.variations.map(v => v.price)) - Math.max(...a.variations.map(v => v.price));
        default:
          return a.name.localeCompare(b.name);
      }
    });
  }, [menuCategories, searchTerm, selectedTypes, priceRange, sortBy]);

  const toggleType = (type: CuisineType) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

   const generateVCF = () => {
     if (!restaurant) return;

     const phoneLines = restaurant.mobileNumbers.map(phone =>
       `TEL;TYPE=${phone.label.toUpperCase()}:${phone.number}`
     ).join('\n');

     const vcfContent = `BEGIN:VCARD
VERSION:3.0
FN:${restaurant.name}
${phoneLines}
ADR;TYPE=WORK:;;${restaurant.address};;;;
END:VCARD`;

     const blob = new Blob([vcfContent], { type: 'text/vcard' });
     const url = URL.createObjectURL(blob);
     const a = document.createElement('a');
     a.href = url;
     a.download = `${restaurant.name}.vcf`;
     document.body.appendChild(a);
     a.click();
     document.body.removeChild(a);
     URL.revokeObjectURL(url);
   };

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center bg-white/70 backdrop-blur-xl rounded-3xl p-12 shadow-xl shadow-slate-200/50">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Restaurant Not Found</h1>
          <p className="text-slate-600">The restaurant you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/">
            <Button className="mt-4 bg-blue-600 hover:bg-blue-700">Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const isOpen = isRestaurantOpen(restaurant.timing);

  return (
    <div className="w-full">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Back Button */}
        <Link href="/">
          <Button variant="ghost" className="mb-6 hover:bg-white/50 rounded-2xl">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Restaurants
          </Button>
        </Link>

        {/* Restaurant Header */}
        <Card className="mb-8 bg-white/70 backdrop-blur-xl border border-slate-200/60 shadow-2xl shadow-slate-200/50 rounded-3xl">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
                    {restaurant.name}
                  </h1>
                  <Badge
                    variant={isOpen ? "default" : "secondary"}
                    className={`rounded-full px-4 py-2 font-medium ${
                      isOpen
                        ? "bg-green-500 hover:bg-green-600 text-white shadow-lg"
                        : "bg-slate-400 text-white"
                    }`}
                  >
                    {isOpen ? "OPEN" : "CLOSED"}
                  </Badge>
                </div>
                <p className="text-slate-600 text-lg mb-6">{restaurant.description}</p>

                {/* Restaurant Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-center gap-3 bg-slate-50/50 rounded-2xl p-4">
                    <Clock className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-semibold text-slate-900">Timing</p>
                      <p className="text-sm text-slate-600">{restaurant.timing.open} - {restaurant.timing.close}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-slate-50/50 rounded-2xl p-4">
                    <MapPin className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-semibold text-slate-900">Address</p>
                      <p className="text-sm text-slate-600">{restaurant.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-slate-50/50 rounded-2xl p-4">
                    <Phone className="h-5 w-5 text-purple-500" />
                    <div>
                      <p className="font-semibold text-slate-900">Contact</p>
                      <p className="text-sm text-slate-600">{restaurant.mobileNumbers[0].number}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-slate-50/50 rounded-2xl p-4">
                    <Truck className="h-5 w-5 text-orange-500" />
                    <div>
                      <p className="font-semibold text-slate-900">Delivery</p>
                      <p className="text-sm text-slate-600">₹{restaurant.deliveryCost}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button onClick={generateVCF} variant="outline" className="rounded-2xl bg-white/50 hover:bg-white/80 border-slate-200">
                  <Download className="h-4 w-4 mr-2" />
                  Save Contact
                </Button>

                {/* Cuisine Types */}
                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">Cuisine Types</h3>
                  <div className="flex flex-wrap gap-2">
                    {restaurant.cuisine.map(cuisine => (
                      <span
                        key={cuisine}
                        className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium shadow-sm ${
                          cuisine === 'VEG' ? 'bg-green-100 text-green-800 border border-green-200' :
                          cuisine === 'NON_VEG' ? 'bg-red-100 text-red-800 border border-red-200' :
                          'bg-blue-100 text-blue-800 border border-blue-200'
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full mr-2 ${
                          cuisine === 'VEG' ? 'bg-green-500' :
                          cuisine === 'NON_VEG' ? 'bg-red-500' : 'bg-blue-500'
                        }`} />
                        {cuisine.replace('_', ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <Card className="bg-white/70 backdrop-blur-xl border-0 shadow-xl shadow-slate-200/50 rounded-3xl sticky top-6">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <SlidersHorizontal className="h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Search Menu</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <Input
                      placeholder="Search items..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-white/50 border-slate-200 rounded-xl"
                    />
                  </div>
                </div>

                <Separator className="bg-slate-200" />

                {/* Type Filters */}
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-3 block">Food Type</label>
                  <div className="space-y-2">
                    {(['VEG', 'NON_VEG', 'JAIN'] as CuisineType[]).map(type => (
                      <Button
                        key={type}
                        variant={selectedTypes.includes(type) ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleType(type)}
                        className={`w-full justify-start rounded-xl ${
                          selectedTypes.includes(type)
                            ? type === 'VEG' ? 'bg-green-500 hover:bg-green-600 text-white'
                            : type === 'NON_VEG' ? 'bg-red-500 hover:bg-red-600 text-white'
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                            : 'bg-white/50 hover:bg-white/80 border-slate-200'
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full mr-3 ${
                          type === 'VEG' ? 'bg-green-500' :
                          type === 'NON_VEG' ? 'bg-red-500' : 'bg-blue-500'
                        }`} />
                        {type.replace('_', ' ')}
                      </Button>
                    ))}
                  </div>
                </div>

                <Separator className="bg-slate-200" />

                {/* Price Range */}
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-3 block">
                    Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={500}
                    min={0}
                    step={10}
                    className="w-full"
                  />
                </div>

                <Separator className="bg-slate-200" />

                {/* Sort Options */}
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-3 block">Sort By</label>
                  <div className="space-y-2">
                    <Button
                      variant={sortBy === 'name' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSortBy('name')}
                      className={`w-full justify-start rounded-xl ${
                        sortBy === 'name'
                          ? 'bg-blue-500 hover:bg-blue-600 text-white'
                          : 'bg-white/50 hover:bg-white/80 border-slate-200'
                      }`}
                    >
                      Name (A-Z)
                    </Button>
                    <Button
                      variant={sortBy === 'price-low' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSortBy('price-low')}
                      className={`w-full justify-start rounded-xl ${
                        sortBy === 'price-low'
                          ? 'bg-blue-500 hover:bg-blue-600 text-white'
                          : 'bg-white/50 hover:bg-white/80 border-slate-200'
                      }`}
                    >
                      Price: Low to High
                    </Button>
                    <Button
                      variant={sortBy === 'price-high' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSortBy('price-high')}
                      className={`w-full justify-start rounded-xl ${
                        sortBy === 'price-high'
                          ? 'bg-blue-500 hover:bg-blue-600 text-white'
                          : 'bg-white/50 hover:bg-white/80 border-slate-200'
                      }`}
                    >
                      Price: High to Low
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Menu Items */}
          <div className="lg:col-span-3">
            <div className="space-y-8">
              {/* View Mode Controls */}
              <Card className="bg-white/70 backdrop-blur-xl border border-slate-200/60 shadow-xl shadow-slate-200/50 rounded-3xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-3xl font-bold text-slate-900 mb-2">Menu</h2>
                      <p className="text-slate-600">Explore our delicious offerings</p>
                    </div>
                    <div className="flex gap-3">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant={viewMode === 'tile' ? 'default' : 'outline'}
                              size="lg"
                              onClick={() => setViewMode('tile')}
                              className={`rounded-xl px-6 py-3 ${
                                viewMode === 'tile'
                                  ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg'
                                  : 'bg-white/50 hover:bg-white/80 border-slate-200 hover:shadow-md'
                              }`}
                            >
                              <Grid3X3 className="h-5 w-5 mr-2" />
                              Grid View
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Grid View</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant={viewMode === 'list' ? 'default' : 'outline'}
                              size="lg"
                              onClick={() => setViewMode('list')}
                              className={`rounded-xl px-6 py-3 ${
                                viewMode === 'list'
                                  ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg'
                                  : 'bg-white/50 hover:bg-white/80 border-slate-200 hover:shadow-md'
                              }`}
                            >
                              <List className="h-5 w-5 mr-2" />
                              List View
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>List View</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                 </CardContent>
               </Card>

               {/* Menu Content */}
               <div className="space-y-8">
                 {filteredMenuItems.length === 0 ? (
                   <Card className="bg-white/70 backdrop-blur-xl border border-slate-200/60 shadow-xl shadow-slate-200/50 rounded-3xl">
                     <CardContent className="p-16">
                       <div className="text-center">
                         <Search className="h-20 w-20 text-slate-400 mx-auto mb-6" />
                         <p className="text-slate-500 text-2xl font-medium mb-2">No menu items found</p>
                         <p className="text-slate-400 text-lg">Try adjusting your filters</p>
                       </div>
                     </CardContent>
                   </Card>
                 ) : (
                    <div className="space-y-12">
                      {/* Group items by category */}
                      {menuCategories.map(category => {
                        const categoryItems = filteredMenuItems.filter(item => item.category === category.id);

                        if (categoryItems.length === 0) return null;

                        return (
                          <div key={category.id} className="space-y-6">
                           {/* Category Header */}
                           <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
                             <h2 className="text-xl font-bold text-slate-900">{category.name}</h2>
                             <Badge variant="outline" className="bg-slate-100 text-slate-700 border-slate-300 text-sm">
                               {categoryItems.length} items
                             </Badge>
                           </div>

                          {/* Category Items */}
                           <div className={
                             viewMode === 'tile'
                               ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                               : "space-y-3"
                           }>
                             {categoryItems.map(item => {
                               const variationPrices = item.variations.map(v => v.price);
                               const lowestPrice = variationPrices.length ? Math.min(...variationPrices) : 0;
                               const primaryType = item.variations[0]?.type;
                               const accentColor = primaryType === 'VEG' ? 'from-green-400 to-emerald-500' : primaryType === 'NON_VEG' ? 'from-rose-400 to-red-500' : 'from-blue-400 to-indigo-500';
                               const ringColor = primaryType === 'VEG' ? 'ring-green-200' : primaryType === 'NON_VEG' ? 'ring-red-200' : 'ring-blue-200';

                               return (
                                 <Card key={item.id} className={`group relative bg-white/80 border border-slate-200/60 shadow-sm hover:shadow-2xl transition-all duration-200 hover:-translate-y-1 rounded-2xl overflow-hidden ${ringColor}`}>
                                   <div className={`absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b ${accentColor}`} />
                                   <CardContent className="p-5">
                                     <div className="flex flex-col h-full gap-3">
                                       <div className="flex items-start justify-between gap-3">
                                         <div>
                                           <h3 className="font-semibold text-slate-900 text-base leading-tight tracking-tight group-hover:text-blue-600">
                                             {item.name}
                                           </h3>
                                           {item.description && (
                                             <p className="text-slate-600 text-sm mt-1 line-clamp-2">
                                               {item.description}
                                             </p>
                                           )}
                                         </div>
                                         <div className="shrink-0">
                                           <span className="inline-flex items-center rounded-xl bg-slate-900 text-white px-3 py-1 text-sm font-semibold shadow-md">
                                             ₹{lowestPrice}
                                           </span>
                                         </div>
                                       </div>

                                       <div className="flex flex-wrap gap-1">
                                         {item.variations.map((variation, index) => (
                                           <span
                                             key={index}
                                             className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium ring-1 ring-inset ${
                                               variation.type === 'VEG' ? 'bg-green-50 text-green-700 ring-green-200' :
                                               variation.type === 'NON_VEG' ? 'bg-red-50 text-red-700 ring-red-200' :
                                               'bg-blue-50 text-blue-700 ring-blue-200'
                                             }`}
                                           >
                                             <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                                               variation.type === 'VEG' ? 'bg-green-500' :
                                               variation.type === 'NON_VEG' ? 'bg-red-500' : 'bg-blue-500'
                                             }`} />
                                             {variation.type.replace('_', ' ')} · ₹{variation.price}
                                           </span>
                                         ))}
                                       </div>


                                    </div>
                                  </CardContent>
                                </Card>
                               );
                             })}
                           </div>
                        </div>
                      );
                     })}
                   </div>
                 )}
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
   );
 }