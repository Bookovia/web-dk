"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Clock } from "lucide-react";
import { PostgrestError } from "@supabase/supabase-js";
import { cn } from "@/lib/utils";
import { GarageMap } from "./MapItems";
const bucketBaseUrl =
  "https://ufkwxbgkxtlvkvxmogto.supabase.co/storage/v1/object/public/";
interface ServiceImage {
  id: string;
  provider_id: string;
  service_id: string;
  image_url: string;
  is_primary: boolean;
  alt_text?: string;
  created_at?: string;
  updated_at?: string;
}

interface Service {
  id: string;
  provider_id: string;
  name: string;
  description?: string;
  price?: number;
  cost?: number;
  amount?: number;
  duration_minutes?: number;
  category?: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
  service_id: string;
}

interface IDetails {
  business_name: string;
  description: string;
  address: string;
  garage_location: string;
}

function getServicePrice(service: Service): number {
  return service.price || service.cost || service.amount || 0;
}

const Tabs = ["Services", "Details"];

export default function DetailTags({
  sortedServices,
  serviceImageMap,
  servicesError,
  Details,
}: {
  sortedServices: any;
  serviceImageMap: Map<string, ServiceImage[]>;
  servicesError: PostgrestError | null;
  Details: IDetails;
}) {
  const [activeTab, setActiveTab] = useState("Services");

  const [sliderStyle, setSliderStyle] = useState({});
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const currentIndex = Tabs.indexOf(activeTab);
    const currentTab = tabRefs.current?.[currentIndex];

    if (currentTab) {
      const { offsetLeft, offsetWidth } = currentTab;
      setSliderStyle({
        left: offsetLeft,
        width: offsetWidth,
      });
    }
  }, [activeTab, Tabs]);

  console.log({ sortedServices });

  return (
    <div>
      <div className="relative mb-6">
        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          {Tabs.map((tab, index) => (
            <button
              key={tab}
              ref={(el: HTMLButtonElement | null): void => {
                tabRefs.current[index] = el;
              }}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "flex-1 pb-3 text-center font-medium border-b-2 transition-colors duration-200",
                activeTab === tab
                  ? "text-primary border-transparent"
                  : "text-gray-500 border-transparent hover:text-primary"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Slider */}
        <div
          className="absolute bottom-0 h-0.5 bg-primary transition-all duration-300"
          style={sliderStyle}
        />
      </div>

      {/* Services Section */}
      <div
        className={`mb-8 transition-all duration-300 ${
          activeTab === "Services"
            ? "opacity-100 scale-100"
            : "opacity-0 hidden scale-95 pointer-events-none"
        }`}
      >
        {sortedServices && sortedServices.length > 0 ? (
          <div className="space-y-6">
            {sortedServices.map((service: Service) => {
              const serviceImagesForService =
                serviceImageMap.get(service.id) || [];
              const primaryImage =
                serviceImagesForService.find((img) => img.is_primary) ||
                serviceImagesForService[0];
              const servicePrice = getServicePrice(service);

              return (
                <div
                  key={service.service_id}
                  className="border-b border-gray-100 pb-6 last:border-b-0"
                >
                  <div className="flex items-start gap-4">
                    {/* Service Image */}
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                      <Image
                        src={
                          primaryImage?.image_url
                            ? `${bucketBaseUrl}${primaryImage.image_url}`
                            : "/placeholder.svg?height=100&width=100"
                        }
                        alt={primaryImage?.alt_text || service.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Service Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-black mb-1">
                        {service.name}
                      </h3>
                      <p className="text-gray-500 text-sm mb-2">
                        {service.description || "Professional service"}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {servicePrice > 0 && (
                            <span className="text-lg font-semibold text-black">
                              ${servicePrice}
                            </span>
                          )}
                          {service.duration_minutes && (
                            <div className="flex items-center text-gray-500 text-sm">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{service.duration_minutes} min</span>
                            </div>
                          )}
                        </div>

                        {service.category && (
                          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs capitalize">
                            {service.category}
                          </span>
                        )}
                      </div>

                      {/* Debug info for each service */}
                      <div className="mt-2 text-xs text-gray-500">
                        Price: {service.price || "N/A"} | Cost:{" "}
                        {service.cost || "N/A"} | Amount:{" "}
                        {service.amount || "N/A"}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No services available at this time.</p>
            <p className="text-sm mt-2">
              Please contact the provider directly for service information.
            </p>
            {servicesError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-4">
                <p className="text-red-600 text-sm">
                  <strong>Error:</strong> {servicesError.message}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <div
        className={`mb-8 transition-all duration-300 space-y-10 ${
          activeTab === "Details"
            ? "opacity-100 scale-100"
            : "opacity-0 hidden scale-95 pointer-events-none"
        }`}
      >
        <GarageMap
          locationHex={Details.garage_location}
          businessName={Details.business_name}
        />
        {/* <AddressMap address={Details.address} /> */}

        {Details?.description && (
          <p className="font-normal text-sm font-jakarta">
            {Details.description}
          </p>
        )}
      </div>
    </div>
  );
}
