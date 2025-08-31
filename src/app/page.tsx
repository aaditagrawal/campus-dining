'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

import { getAllRestaurants } from '@/lib/dataLoader';
import { CuisineType, isRestaurantOpen } from '@/lib/types';
import { Search, Clock, MapPin, Phone, Truck, Filter, Package } from 'lucide-react';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisines, setSelectedCuisines] = useState<CuisineType[]>([]);
  const [showOpenOnly, setShowOpenOnly] = useState(false);

  const filteredRestaurants = useMemo(() => {
    return getAllRestaurants().filter(restaurant => {
      // Search filter
      if (searchTerm && !restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !restaurant.address.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Cuisine filter
      if (selectedCuisines.length > 0) {
        const hasSelectedCuisine = selectedCuisines.some(cuisine =>
          restaurant.cuisine.includes(cuisine)
        );
        if (!hasSelectedCuisine) return false;
      }

      // Open/Closed filter
      if (showOpenOnly && !isRestaurantOpen(restaurant.timing)) {
        return false;
      }

      return true;
    });
  }, [searchTerm, selectedCuisines, showOpenOnly]);

  const toggleCuisine = (cuisine: CuisineType) => {
    setSelectedCuisines(prev =>
      prev.includes(cuisine)
        ? prev.filter(c => c !== cuisine)
        : [...prev, cuisine]
    );
  };

  return (
    <div className="w-full">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16 font-serif">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 px-4 leading-relaxed py-4 relative">
            <span className="block bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent pb-2 bg-clip-text">Campus Dining @ MIT Manipal</span>
          </h1>
          <div className="text-slate-600 text-base sm:text-lg md:text-xl max-w-4xl mx-auto space-y-3 px-4">
            <p>
              <strong>Why does this exist?</strong> - To provide one central, filterable and navigable menu platform for MIT restaurants, unlike changepe or dotfood which are about sales.
            </p>
            <p>
              <strong>How do I order?</strong> - Just save the contact and order away
            </p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="mb-16 flex flex-col lg:flex-row gap-6 items-center justify-center max-w-4xl mx-auto">
          {/* Search */}
          <div className="relative flex-1 w-full lg:w-96">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
            <Input
              placeholder="Search restaurants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 sm:h-14 bg-white/80 border-slate-200 rounded-2xl text-base sm:text-lg placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-lg"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-4 items-center">
            {/* Cuisine Filters */}
            <div className="flex gap-2">
              {(['VEG', 'NON_VEG', 'JAIN'] as CuisineType[]).map(cuisine => (
                <Button
                  key={cuisine}
                  variant={selectedCuisines.includes(cuisine) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleCuisine(cuisine)}
                  className={`rounded-full px-4 py-2 transition-all duration-200 ${
                    selectedCuisines.includes(cuisine)
                      ? cuisine === 'VEG' ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg'
                      : cuisine === 'NON_VEG' ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg'
                      : 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg'
                      : 'bg-white/80 hover:bg-white border-slate-200 hover:shadow-md'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full mr-2 ${
                    cuisine === 'VEG' ? 'bg-green-500' :
                    cuisine === 'NON_VEG' ? 'bg-red-500' : 'bg-blue-500'
                  }`} />
                  {cuisine.replace('_', ' ')}
                </Button>
              ))}
            </div>

            {/* Open/Closed Filter */}
            <div className="flex items-center space-x-3 bg-white/80 rounded-full px-4 py-2 shadow-md">
              <Switch
                id="open-only"
                checked={showOpenOnly}
                onCheckedChange={setShowOpenOnly}
                className="data-[state=checked]:bg-green-500"
              />
              <label htmlFor="open-only" className="text-sm font-medium text-slate-700 cursor-pointer">
                Open only
              </label>
            </div>
          </div>
        </div>

        {/* Restaurant Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto px-4">
          {filteredRestaurants.map(restaurant => {
            const isOpen = restaurant.timing ? isRestaurantOpen(restaurant.timing) : false;
            return (
              <Link key={restaurant.id} href={`/restaurant/${restaurant.id}`}>
                <Card className="group relative bg-white/90 backdrop-blur-xl border border-slate-200/60 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 rounded-3xl cursor-pointer overflow-hidden">
                  <div className={`absolute inset-x-0 top-0 h-1 ${isOpen ? 'bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-400' : 'bg-gradient-to-r from-slate-300 via-slate-400 to-slate-300'}`} />
                  <CardContent className="p-4 sm:p-6">
                    <div className="space-y-4 sm:space-y-5">
                      {/* Heading Row */}
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 flex-wrap">
                            <h3 className="text-lg font-bold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors break-words hyphens-auto">
                              {restaurant.name}
                            </h3>
                            <Badge
                              variant={isOpen ? "default" : "secondary"}
                              className={`rounded-full px-3 py-1 font-medium shadow ${isOpen ? 'bg-green-500 hover:bg-green-600 text-white ring-1 ring-green-500/30' : 'bg-slate-400 text-white ring-1 ring-slate-400/30'}`}
                            >
                              {isOpen ? 'Open' : 'Closed'}
                            </Badge>
                          </div>
                          <div className="mt-1 text-slate-600 text-sm flex items-start gap-2">
                            <MapPin className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />
                            <span className="break-words hyphens-auto leading-relaxed">{restaurant.address ?? ''}</span>
                          </div>
                        </div>
                      </div>

                      {/* Cuisine Types */}
                      <div className="flex flex-wrap gap-2">
                        {restaurant.cuisine.map(cuisine => (
                          <span
                            key={cuisine}
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ring-1 ring-inset ${
                              cuisine === 'VEG' ? 'bg-green-50 text-green-700 ring-green-200' :
                              cuisine === 'NON_VEG' ? 'bg-red-50 text-red-700 ring-red-200' :
                              'bg-blue-50 text-blue-700 ring-blue-200'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full mr-2 ${
                              cuisine === 'VEG' ? 'bg-green-500' :
                              cuisine === 'NON_VEG' ? 'bg-red-500' : 'bg-blue-500'
                            }`} />
                            {cuisine.replace('_', ' ')}
                          </span>
                        ))}
                      </div>

                      {/* Meta Row */}
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 text-sm">
                        <div className="flex items-center gap-2 text-slate-600 min-w-0">
                          <Clock className="h-4 w-4 shrink-0" />
                          <span className="font-medium truncate">{restaurant.timing?.open ?? '—'} - {restaurant.timing?.close ?? '—'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600 min-w-0">
                          <Truck className="h-4 w-4 shrink-0" />
                          <span className="font-medium truncate">₹{restaurant.deliveryCost ?? 0}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600 min-w-0">
                          <Package className="h-4 w-4 shrink-0" />
                          <span className="font-medium truncate">{restaurant.packagingCharges ?? 'N/A'}</span>
                        </div>
                      </div>

                      {/* Contact */}
                      <div className="flex items-center justify-between pt-3 border-t border-slate-200/70">
                        <div className="flex items-center gap-2 text-slate-600 text-sm min-w-0 flex-1">
                          <Phone className="h-4 w-4 shrink-0" />
                          <span className="truncate">{restaurant.mobileNumbers?.[0]?.number ?? 'N/A'}</span>
                        </div>
                        <span className="text-slate-400 text-xs group-hover:text-blue-600 transition-colors shrink-0 ml-2">View menu →</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {filteredRestaurants.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-12 shadow-xl shadow-slate-200/50">
              <Filter className="h-16 w-16 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-500 text-xl">No restaurants found matching your criteria.</p>
              <p className="text-slate-400 mt-2">Try adjusting your filters or search terms.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}