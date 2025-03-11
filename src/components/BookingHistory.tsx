import { useBooking } from "@/context/BookingContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Package, Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useMemo, useCallback, memo } from "react";
import { FixedSizeList as List } from "react-window";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// Memoized booking item component for better performance
const BookingItem = memo(({ 
  booking, 
  onStatusChange 
}: { 
  booking: {
    id: string;
    packageId: number;
    packageTitle: string;
    bookingDate: string;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  };
  onStatusChange: (id: string, status: 'pending' | 'confirmed' | 'completed' | 'cancelled') => void;
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm mb-3">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="font-medium text-lg text-himalaya-800">{booking.packageTitle}</h3>
          
          <div className="flex flex-wrap gap-3 mt-2">
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{formatDate(booking.bookingDate)}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-1" />
              <span>Booking ID: {booking.id.slice(-8)}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge className={`${getStatusColor(booking.status)} capitalize`}>
            {booking.status}
          </Badge>
          
          {booking.status === 'pending' && (
            <Button 
              variant="outline" 
              size="sm"
              className="text-red-600 border-red-200 hover:bg-red-50"
              onClick={() => onStatusChange(booking.id, 'cancelled')}
            >
              Cancel
            </Button>
          )}
        </div>
      </div>
    </div>
  );
});

BookingItem.displayName = 'BookingItem';

// Row renderer for virtualized list
const Row = ({ index, style, data }: { index: number; style: React.CSSProperties; data: any }) => {
  const { items, onStatusChange } = data;
  const booking = items[index];
  
  return (
    <div style={style}>
      <BookingItem booking={booking} onStatusChange={onStatusChange} />
    </div>
  );
};

const ITEMS_PER_PAGE = 5;

const BookingHistory = () => {
  const { state, updateBookingStatus } = useBooking();
  const { bookingHistory } = state;
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('all');

  // Filter bookings based on search term and status
  const filteredBookings = useMemo(() => {
    let filtered = [...bookingHistory];
    
    // Apply tab filter
    if (activeTab !== 'all') {
      filtered = filtered.filter(booking => booking.status === activeTab);
    }
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(booking => 
        booking.packageTitle.toLowerCase().includes(term) || 
        booking.id.toLowerCase().includes(term)
      );
    }
    
    // Apply status filter
    if (statusFilter) {
      filtered = filtered.filter(booking => booking.status === statusFilter);
    }
    
    return filtered;
  }, [bookingHistory, searchTerm, statusFilter, activeTab]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredBookings.length / ITEMS_PER_PAGE);
  const paginatedBookings = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredBookings.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredBookings, currentPage]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle status change
  const handleStatusChange = useCallback((id: string, status: 'pending' | 'confirmed' | 'completed' | 'cancelled') => {
    updateBookingStatus(id, status);
  }, [updateBookingStatus]);

  if (bookingHistory.length === 0) {
    return (
      <div className="text-center py-8 px-4">
        <Package className="h-12 w-12 mx-auto text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-700 mb-2">No Bookings Yet</h3>
        <p className="text-gray-500 mb-4">You haven't made any bookings yet.</p>
        <Button 
          variant="outline" 
          onClick={() => window.location.href = '/packages'}
        >
          Browse Packages
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-himalaya-800">Your Booking History</h2>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search bookings..."
              className="pl-9 h-9 w-full sm:w-[200px]"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
            />
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          {paginatedBookings.length > 0 ? (
            <>
              {paginatedBookings.map((booking) => (
                <BookingItem 
                  key={booking.id} 
                  booking={booking} 
                  onStatusChange={handleStatusChange} 
                />
              ))}
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No bookings match your search criteria.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="pending" className="mt-0">
          {paginatedBookings.length > 0 ? (
            <>
              {paginatedBookings.map((booking) => (
                <BookingItem 
                  key={booking.id} 
                  booking={booking} 
                  onStatusChange={handleStatusChange} 
                />
              ))}
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No pending bookings found.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="confirmed" className="mt-0">
          {paginatedBookings.length > 0 ? (
            <>
              {paginatedBookings.map((booking) => (
                <BookingItem 
                  key={booking.id} 
                  booking={booking} 
                  onStatusChange={handleStatusChange} 
                />
              ))}
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No confirmed bookings found.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="completed" className="mt-0">
          {paginatedBookings.length > 0 ? (
            <>
              {paginatedBookings.map((booking) => (
                <BookingItem 
                  key={booking.id} 
                  booking={booking} 
                  onStatusChange={handleStatusChange} 
                />
              ))}
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No completed bookings found.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={page === currentPage ? "default" : "outline"}
                size="sm"
                className={cn(
                  "h-8 w-8 p-0",
                  page === currentPage && "bg-primary text-primary-foreground"
                )}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </Button>
            ))}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      {/* For large datasets, use virtualization */}
      {filteredBookings.length > 20 && (
        <div className="h-[400px] mt-6 border rounded-lg">
          <List
            height={400}
            itemCount={filteredBookings.length}
            itemSize={120}
            width="100%"
            itemData={{ items: filteredBookings, onStatusChange: handleStatusChange }}
          >
            {Row}
          </List>
        </div>
      )}
    </div>
  );
};

export default BookingHistory; 