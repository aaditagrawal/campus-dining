import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getRestaurantById, getMenuCategoriesByRestaurantId, getAllRestaurants } from '@/lib/dataLoader';
import { isRestaurantOpen } from '@/lib/types';
import { ArrowLeft, Clock, MapPin, Phone, Truck, Download } from 'lucide-react';

// Generate static params for all restaurant IDs
export async function generateStaticParams() {
  const restaurants = getAllRestaurants();

  return restaurants.map((restaurant) => ({
    id: restaurant.id,
  }));
}

export default function RestaurantPage({ params }: { params: { id: string } }) {
  const restaurant = getRestaurantById(params.id);
  const menuCategories = getMenuCategoriesByRestaurantId(params.id);

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
                      <p className="text-sm text-slate-600">{restaurant.mobileNumbers[0]?.number || 'N/A'}</p>
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

        {/* Menu Categories */}
        <div className="space-y-8">
          {menuCategories.map(category => {
            if (category.items.length === 0) return null;

            return (
              <div key={category.id} className="space-y-6">
                {/* Category Header */}
                <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
                  <h2 className="text-xl font-bold text-slate-900">{category.name}</h2>
                  <Badge variant="outline" className="bg-slate-100 text-slate-700 border-slate-300 text-sm">
                    {category.items.length} items
                  </Badge>
                </div>

                {/* Category Items */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {category.items.map(item => {
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
      </div>
    </div>
  );
}
